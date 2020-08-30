import * as React from 'react';
import { gql } from '@apollo/client';
import { initializeApollo } from '../../../../lib/apolloClient';
import { ALL_POSTS_QUERY } from '../../../blog';
import BlogPost from '../../../../components/BlogPost';
import { IMetaData } from '../../../../../scripts/utils/blog';
import { generateTopList, parseContentBlock } from '../../../../utils/blog';
import { IContentBlock } from '../../../../utils/types';

interface IBlogPostProps extends IApolloQueryProps<{}> {
	contentBlocks: IContentBlock[];
}

export function Post({
	initialApolloState: { ROOT_QUERY },
	contentBlocks
}: IBlogPostProps) {
	const { metaData, fileName, snippet } = Object.values(ROOT_QUERY)[1] as {
		metaData: IMetaData;
		fileName: string;
		postType: string;
		snippet: string;
	};

	const renderBody = React.useCallback(() => {
		if (metaData.post_type === 'top_list') {
			return generateTopList(contentBlocks);
		}

		return contentBlocks.map(parseContentBlock);
	}, []);

	return (
		<BlogPost
			title={metaData.post_title}
			fileName={fileName.replace('.md', '')}
			publishDate={metaData.post_date}
			author={metaData.post_author}
			seo={{
				pageTitle: metaData.seoTitle ? metaData.seoTitle : '',
				pageDescription: snippet
					? snippet
							.replace(/<\/?p>/g, '')
							.trim()
							.slice(0, 160)
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
			fileName
			path
			slug
			snippet
			contentBlocks
			metaData {
				post_title
				post_date
				post_author
				post_type
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
