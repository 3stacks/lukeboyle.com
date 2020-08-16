import * as React from 'react';
import { gql } from '@apollo/client';
import { initializeApollo } from '../../../../lib/apolloClient';
import { ALL_POSTS_QUERY } from '../../../blog';
import BlogPost from '../../../../components/BlogPost/BlogPost';
import { IMetaData } from '../../../../../scripts/utils/blog';
import { IContentBlock, parseContentBlock } from '../../../../utils/blog';

interface IBlogPostProps extends IApolloQueryProps<{}> {
	contentBlocks: IContentBlock[];
}

export function Post({
	initialApolloState: { ROOT_QUERY },
	contentBlocks
}: IBlogPostProps) {
	const { contents, canonicalUrl, metaData, fileName } = Object.values(
		ROOT_QUERY
	)[1] as {
		contents: string;
		canonicalUrl: string;
		metaData: IMetaData;
		fileName: string;
	};
	const renderBody = React.useCallback(
		() => contentBlocks.map(parseContentBlock),
		[]
	);

	if (!contents) {
		return null;
	}

	return (
		<BlogPost
			title={metaData.post_title}
			fileName={fileName.replace('.md', '')}
			publishDate={metaData.post_date}
			author={metaData.post_author}
			canonical={canonicalUrl}
			seo={{
				canonical: canonicalUrl ? canonicalUrl : '',
				pageTitle: metaData.seoTitle ? metaData.seoTitle : '',
				pageDescription: metaData.seoDescription
					? metaData.pageDescription
					: ''
			}}
		>
			{renderBody()}
		</BlogPost>
	);
}

export async function getStaticPaths() {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: ALL_POSTS_QUERY
	});

	const {
		ROOT_QUERY: { blogPosts }
	} = apolloClient.cache.extract() as { ROOT_QUERY: { blogPosts: any[] } };

	const paths = blogPosts.map(post => `/${post.path.replace('.md', '')}`);

	return { paths, fallback: false };
}

export const POST_QUERY = gql`
	query BlogPost($path: String!) {
		blogPost(path: $path) {
			canonicalUrl
			fileName
			path
			slug
			snippet
			publishDate
			contents
			contentBlocks
			metaData {
				post_title
				post_date
				post_author
			}
		}
	}
`;

export interface IApolloQueryProps<T> {
	initialApolloState: {
		ROOT_QUERY: T;
	};
}

export async function getStaticProps({ params }) {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: POST_QUERY,
		variables: {
			path: `/blog-posts/${params.year}/${params.month}/${params.title}`
		}
	});

	const response = apolloClient.cache.extract();

	const contentBlocks = JSON.parse(
		(Object.values(response.ROOT_QUERY)[1] as any).contentBlocks
	);

	return {
		props: {
			initialApolloState: response,
			contentBlocks
		},
		revalidate: 1
	};
}

export default Post;
