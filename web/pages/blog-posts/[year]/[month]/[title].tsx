import * as React from 'react';
import { gql } from '@apollo/client';
import LazyLoad from 'react-lazyload';
import { initializeApollo } from '../../../../lib/apolloClient';
import { ALL_POSTS_QUERY } from '../../../blog';
import BlogPost from '../../../../components/BlogPost/BlogPost';
import { IMetaData } from '../../../../../scripts/utils/blog';
import Link from 'next/link';

interface IBlogPostProps extends IApolloQueryProps<{}> {
	contentBlocks: IContentBlock[];
}

const parseContentBlock = (contentBlock: IContentBlock, index: number) => {
	console.log(contentBlock);
	switch (contentBlock.type) {
		case CONTENT_BLOCK_TYPES.PARAGRAPH:
			return (
				<p key={index}>{contentBlock.tokens.map(parseContentBlock)}</p>
			);
		case CONTENT_BLOCK_TYPES.TEXT:
			return contentBlock.raw;
		case CONTENT_BLOCK_TYPES.LINK:
			return (
				<Link href={contentBlock.href}>
					<a title={contentBlock.title}>{contentBlock.text}</a>
				</Link>
			);
		case CONTENT_BLOCK_TYPES.HEADING:
			const HeadingTag = `h${contentBlock.depth}`;

			// @ts-ignore
			return <HeadingTag>{contentBlock.text}</HeadingTag>;
		case CONTENT_BLOCK_TYPES.LIST_ITEM:
			return <li>{contentBlock.tokens.map(parseContentBlock)}</li>;
		case CONTENT_BLOCK_TYPES.LIST:
			if (contentBlock.ordered) {
				return <ol>{contentBlock.items.map(parseContentBlock)}</ol>;
			}

			return <ul>{contentBlock.items.map(parseContentBlock)}</ul>;
		case CONTENT_BLOCK_TYPES.IMAGE:
			const imageUrl = contentBlock.href.replace('/web/public', '');
			const urlParts = imageUrl.split('/');

			return (
				<LazyLoad once>
					<img
						src={imageUrl}
						alt={contentBlock.text}
						data-identifier={
							urlParts[urlParts.length - 1].split('.')[0]
						}
					/>
				</LazyLoad>
			);

		case CONTENT_BLOCK_TYPES.SPACE:
			return '';
		case CONTENT_BLOCK_TYPES.ESCAPE:
			return contentBlock.text;
		default:
			console.log(contentBlock);
			return null;
	}
};

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
			{contentBlocks.map(parseContentBlock)}
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

enum CONTENT_BLOCK_TYPES {
	PARAGRAPH = 'paragraph',
	HEADING = 'heading',
	SPACE = 'space',
	TEXT = 'text',
	LINK = 'link',
	IMAGE = 'image',
	LIST = 'list',
	LIST_ITEM = 'list_item',
	ESCAPE = 'escape'
}

interface IEscapeBlock {
	type: CONTENT_BLOCK_TYPES.ESCAPE;
	raw: string;
	text: string;
}

interface IImageBlock {
	type: CONTENT_BLOCK_TYPES.IMAGE;
	raw: string;
	href: string;
	title: string;
	text: string;
}

interface IHeadingBlock {
	type: CONTENT_BLOCK_TYPES.HEADING;
	raw: string;
	depth: number;
	text: string;
	tokens: ITextBlock[];
}

interface IListBlock {
	type: CONTENT_BLOCK_TYPES.LIST;
	raw: string;
	ordered: boolean;
	start: string;
	loose: boolean;
	items: [];
}

interface IListItemBlock {
	type: CONTENT_BLOCK_TYPES.LIST_ITEM;
	raw: string;
	task: boolean;
	loose: boolean;
	text: string;
	tokens: any[];
}

interface ISpaceBlock {
	type: CONTENT_BLOCK_TYPES.SPACE;
	raw: string;
}

interface IParagraphBlock {
	type: CONTENT_BLOCK_TYPES.PARAGRAPH;
	raw: string;
	text: string;
	tokens: object[];
}

interface ILinkBlock {
	type: CONTENT_BLOCK_TYPES.LINK;
	raw: string;
	href: string;
	title: string | null;
	text: string;
	tokens: IContentBlock[];
}

interface ITextBlock {
	type: CONTENT_BLOCK_TYPES.TEXT;
	raw: string;
	text: string;
}

type IContentBlock =
	| IParagraphBlock
	| ISpaceBlock
	| ITextBlock
	| ILinkBlock
	| IImageBlock
	| IHeadingBlock
	| IListBlock
	| IListItemBlock
	| IEscapeBlock;

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
