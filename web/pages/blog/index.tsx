import * as React from 'react';
import { gql } from '@apollo/client';
import Head from 'next/head';
import { initializeApollo } from '../../lib/apolloClient';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { BodyWrapper, MainHeader } from '../../styled/music.style';
import HomeHeadBanner from '../../components/HomeHeadBanner';
import { META_DESCRIPTION } from '../../constants';
import BlogPreview from '../../components/BlogPreview';
import PostArchive from '../../components/PostArchive';
import Pagination from '../../components/Pagination';
import { getPostArchiveFromBlogPosts } from '../../utils/blog';

export function getTotalPages(items: any[], pageLimit: number = 6): number {
	return Math.ceil(items.length / pageLimit);
}

const BlogPage = (props: {
	initialApolloState: { ROOT_QUERY: { blogPosts: any[] } };
}) => {
	const { blogPosts } = props.initialApolloState.ROOT_QUERY;

	if (!blogPosts) {
		return null;
	}

	const archiveData = React.useMemo(
		() => getPostArchiveFromBlogPosts(blogPosts),
		[blogPosts]
	);
	const pagePosts = blogPosts.slice(0, 6);
	const pageCount = React.useMemo(() => getTotalPages(blogPosts), [
		blogPosts
	]);

	return (
		<main className="main">
			<Head>
				<title>Blog | Luke Boyle</title>
				<meta name="description" content={META_DESCRIPTION.BLOG} />
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
							{pagePosts.map(post => {
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
							<Pagination pageNumber={0} pageCount={pageCount} />
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
				post_type
				post_category
				post_status
			}
		}
	}
`;

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: ALL_POSTS_QUERY
	});

	return {
		props: {
			initialApolloState: apolloClient.cache.extract()
		},
		revalidate: 1
	};
}

export default BlogPage;
