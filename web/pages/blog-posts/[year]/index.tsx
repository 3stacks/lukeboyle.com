import * as React from 'react';
import { gql } from '@apollo/client';
import { initializeApollo } from '../../../lib/apolloClient';
import { ALL_POSTS_QUERY, getTotalPages } from '../../blog';
import BlogPost from '../../../components/BlogPost/BlogPost';
import { IMetaData } from '../../../../scripts/utils/blog';
import {
	generateTopList,
	IContentBlock,
	parseContentBlock
} from '../../../utils/blog';
import { IApolloQueryProps } from './[month]/[title]';
import { getPostArchiveFromBlogPosts } from '../../../components/utils';
import Head from 'next/head';
import HomeHeadBanner from '../../../components/HomeHeadBanner';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { BodyWrapper, MainHeader } from '../../../styled/music.style';
import PostArchive from '../../../components/PostArchive';
import BlogPreview from '../../../components/BlogPreview/BlogPreview';

interface IBlogPostProps extends IApolloQueryProps<{}> {
	contentBlocks: IContentBlock[];
}

export const YearPage = ({
	year,
	filteredPosts,
	blogPosts
}: {
	year: string;
	filteredPosts: any[];
	blogPosts: any[];
}) => {
	if (!filteredPosts) {
		return null;
	}

	const archiveData = React.useMemo(
		() => getPostArchiveFromBlogPosts(blogPosts),
		[blogPosts]
	);

	return (
		<main className="main">
			<Head>
				<title>Blog {year} | Luke Boyle</title>
			</Head>
			<div className="head-slot">
				<HomeHeadBanner hasColor>
					<h1 className="site-name">Boyleing Point</h1>
					<p>Psychotic ramblings about technology</p>
				</HomeHeadBanner>
			</div>
			<div className="body-slot">
				<MaxWidthContainer>
					<BodyWrapper>
						<div className="left">
							<MainHeader>Post Archive</MainHeader>
							<PostArchive data={archiveData} />
						</div>
						<div>
							{filteredPosts.map(post => {
								return (
									<BlogPreview
										key={post.path}
										author={post.metaData.post_author}
										publishDate={post.metaData.post_date}
										title={post.metaData.post_title}
										slug={`/${post.path.replace(
											'.md',
											''
										)}`}
									>
										<span
											dangerouslySetInnerHTML={{
												__html: post.snippet
											}}
										/>
									</BlogPreview>
								);
							})}
						</div>
					</BodyWrapper>
				</MaxWidthContainer>
			</div>
		</main>
	);
};

export async function getStaticPaths() {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: ALL_POSTS_QUERY
	});

	const {
		ROOT_QUERY: { blogPosts }
	} = apolloClient.cache.extract() as { ROOT_QUERY: { blogPosts: any[] } };

	const paths = blogPosts.reduce((acc, curr) => {
		const postYear = new Date(curr.metaData.post_date).getFullYear();

		if (!acc.includes(postYear)) {
			return [...acc, `/blog-posts/${postYear.toString()}`];
		}

		return acc;
	}, []);

	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: ALL_POSTS_QUERY
	});

	const response = apolloClient.cache.extract() as {
		ROOT_QUERY: { blogPosts: any[] };
	};
	const blogPosts = response.ROOT_QUERY.blogPosts;

	return {
		props: {
			blogPosts,
			filteredPosts: blogPosts.filter(post => {
				return post.path.startsWith(`blog-posts/${params.year}`);
			}),
			year: params.year
		},
		revalidate: 1
	};
}

export default YearPage;
