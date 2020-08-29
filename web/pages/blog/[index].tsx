import * as React from 'react';
import { gql } from '@apollo/client';
import { initializeApollo } from '../../lib/apolloClient';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { BodyWrapper, MainHeader } from '../../styled/music.style';
import HomeHeadBanner from '../../components/HomeHeadBanner';
import BlogPreview from '../../components/BlogPreview';
import PostArchive from '../../components/PostArchive';
import Pagination from '../../components/Pagination';
import { getTotalPages } from './index';
import { getPostArchiveFromBlogPosts } from '../../utils/blog';
import Head from 'next/head';

const BlogPage = ({
	pageNumber,
	initialApolloState
}: {
	pageNumber;
	initialApolloState: { ROOT_QUERY: { blogPosts: any[] } };
}) => {
	const { blogPosts } = initialApolloState.ROOT_QUERY;

	if (!blogPosts) {
		return null;
	}

	const pageCount = React.useMemo(() => getTotalPages(blogPosts), [
		blogPosts
	]);
	const parsedPageNumber = parseInt(pageNumber, 10);
	const postStartIndex = parsedPageNumber * 6;
	const postsForPage = blogPosts.slice(postStartIndex, postStartIndex + 6);
	const archiveData = React.useMemo(
		() => getPostArchiveFromBlogPosts(blogPosts),
		[blogPosts]
	);

	return (
		<main className="main">
			<Head>
				<title>Blog - Page {pageNumber} | Luke Boyle</title>
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
							{postsForPage.map(post => {
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
							<Pagination
								pageNumber={parseInt(pageNumber, 10)}
								pageCount={pageCount}
							/>
						</div>
					</BodyWrapper>
				</MaxWidthContainer>
			</div>
		</main>
	);
};

export const ALL_POSTS_QUERY = gql`
	query {
		blogPosts {
			path
			slug
			snippet
			metaData {
				post_title
				post_date
				post_author
			}
		}
	}
`;

export async function getStaticPaths() {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: ALL_POSTS_QUERY
	});

	const {
		ROOT_QUERY: { blogPosts }
	} = apolloClient.cache.extract() as {
		ROOT_QUERY: { blogPosts: any[] };
	};

	const pageCount = getTotalPages(blogPosts);
	const pages = new Array(pageCount).fill(true);
	const paths = pages.map((_, index) => `/blog/${index + 1}`);

	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: ALL_POSTS_QUERY
	});

	return {
		props: {
			pageNumber: params.index,
			initialApolloState: apolloClient.cache.extract()
		},
		revalidate: 1
	};
}

export default BlogPage;
