import * as React from 'react';
import { gql } from '@apollo/client';
import { initializeApollo } from '../../lib/apolloClient';
import { IPortfolioItem } from '../../data/portfolio-items';
import portfolioData from '../../data/portfolio-items';
import { MY_NAME, PORTFOLIO_ITEM_NAMES } from '../../constants';
import HomeHeadBanner from '../../components/HomeHeadBanner/HomeHeadBanner';
import Head from 'next/head';
import Layout from '../../components/Layout/Layout';
import { PortfolioContent } from '../../styled/portfolio.style';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledPost } from '../../components/BlogPost/BlogPost.style';
import { IMetaData } from '../../../scripts/utils/blog';
import { ExternalLink, LinkButton } from '../../components/Button';
import { RecentStuff, Stuff } from '../../index.style';

interface IPortfolioPostProps extends IApolloQueryProps<{}> {}

export function PortfolioItem({
    initialApolloState: { ROOT_QUERY }
}: IPortfolioPostProps) {
    const {
        path,
        fileName,
        componentName,
        headMarkup,
        bodyMarkup
    } = Object.values(ROOT_QUERY)[1] as {
        path: string;
        fileName: string;
        componentName: string;
        headMarkup: string;
        bodyMarkup: string;
    };

    const parsedFileName = fileName.toUpperCase().replace(/-/g, '_');

    if (!fileName) {
        return null;
    }

    const portfolioContent: IPortfolioItem = portfolioData.find(
        data => data.name === PORTFOLIO_ITEM_NAMES[parsedFileName]
    );

    return (
        <main className="main">
            <div className="head-slot">
                <HomeHeadBanner hasColor={false}>
                    <div dangerouslySetInnerHTML={{ __html: headMarkup }} />
                </HomeHeadBanner>
            </div>
            <div className="body-slot">
                <PortfolioContent>
                    <Head>
                        <title>
                            {portfolioContent.name} | Project Case Study
                        </title>
                        <meta
                            name="description"
                            content={portfolioContent.snippet}
                        />
                    </Head>
                    <MaxWidthContainer>
                        <StyledPost className="content">
                            <div
                                dangerouslySetInnerHTML={{ __html: bodyMarkup }}
                            />
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
            headMarkup
            bodyMarkup
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
