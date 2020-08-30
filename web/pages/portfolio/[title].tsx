import * as React from 'react';
import { gql } from '@apollo/client';
import { initializeApollo } from '../../lib/apolloClient';
import { IPortfolioItem } from '../../data/portfolio-items';
import portfolioData from '../../data/portfolio-items';
import { PORTFOLIO_ITEM_NAMES } from '../../constants';
import HomeHeadBanner from '../../components/HomeHeadBanner';
import Head from 'next/head';
import { PortfolioContent } from '../../styled/portfolio.style';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledPost } from '../../components/BlogPost/style';
import { ExternalLink } from '../../components/Button';
import { parseContentBlock } from '../../utils/blog';

interface IPortfolioPostProps extends IApolloQueryProps<{}> {}

export function PortfolioItem({
	initialApolloState: { ROOT_QUERY }
}: IPortfolioPostProps) {
	const { fileName, headMarkup, bodyBlocks } = Object.values(
		ROOT_QUERY
	)[1] as {
		fileName: string;
		headMarkup: string;
		bodyBlocks: string;
	};

	const parsedFileName = fileName.toUpperCase().replace(/-/g, '_');

	if (!fileName) {
		return null;
	}

	const portfolioContent: IPortfolioItem = portfolioData.find(
		data => data.name === PORTFOLIO_ITEM_NAMES[parsedFileName]
	);
	const parsedBodyBlocks = JSON.parse(bodyBlocks);

	return (
		<main className="main">
			<Head>
				<title>{portfolioContent.name} Case Study | Luke Boyle</title>
				<meta name="description" content={portfolioContent.snippet} />
			</Head>
			<div className="head-slot">
				<HomeHeadBanner hasColor={false}>
					{parseContentBlock(parsedBodyBlocks[0])}
				</HomeHeadBanner>
			</div>
			<div className="body-slot">
				<PortfolioContent>
					<MaxWidthContainer>
						<StyledPost className="content">
							{parsedBodyBlocks.slice(1).map(parseContentBlock)}
							<div className="buttons">
								{portfolioContent.links.map(ExternalLink)}
							</div>
						</StyledPost>
					</MaxWidthContainer>
				</PortfolioContent>
			</div>
		</main>
	);
}

export const POST_QUERY = gql`
	query PortfolioItem($path: String!) {
		portfolioItem(path: $path) {
			path
			fileName
			componentName
			bodyBlocks
		}
	}
`;

export const PORTFOLIO_ITEMS_QUERY = gql`
	query {
		portfolioItems {
			path
			fileName
			componentName
		}
	}
`;

export interface IApolloQueryProps<T> {
	initialApolloState: {
		ROOT_QUERY: T;
	};
}

export async function getStaticPaths() {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: PORTFOLIO_ITEMS_QUERY
	});

	const {
		ROOT_QUERY: { portfolioItems }
	} = apolloClient.cache.extract() as {
		ROOT_QUERY: { portfolioItems: any[] };
	};

	const paths = portfolioItems.map(post => {
		return `/${post.path
			.replace('.md', '')
			.replace('portfolio-items', 'portfolio')}`;
	});

	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: POST_QUERY,
		variables: {
			path: `/portfolio-items/${params.title}`
		}
	});

	return {
		props: {
			initialApolloState: apolloClient.cache.extract()
		},
		revalidate: 1
	};
}

export default PortfolioItem;
