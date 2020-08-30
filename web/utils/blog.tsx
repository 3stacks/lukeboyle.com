import * as React from 'react';
import Link from 'next/link';
import safeGet from 'lodash/get';
import Image from '../components/Image';
import { IPostArchive } from '../components/PostArchive';
import {
	CONTENT_BLOCK_TYPES,
	IContentBlock,
	IHeadingBlock,
	IImageBlock
} from './types';

export const parseContentBlock = (contentBlock: IContentBlock) => {
	const key = Math.random();

	switch (contentBlock.type) {
		case CONTENT_BLOCK_TYPES.PARAGRAPH:
			return (
				<p key={key}>{contentBlock.tokens.map(parseContentBlock)}</p>
			);
		case CONTENT_BLOCK_TYPES.TEXT:
			return (
				<React.Fragment key={key}>
					{contentBlock.tokens
						? contentBlock.tokens.map(parseContentBlock)
						: contentBlock.raw}
				</React.Fragment>
			);
		case CONTENT_BLOCK_TYPES.LINK:
			if (contentBlock.href.startsWith('#')) {
				return (
					<a href={contentBlock.href} key={key}>
						{contentBlock.tokens.map(parseContentBlock)}
					</a>
				);
			}
			return (
				<Link href={contentBlock.href} key={key}>
					<a title={contentBlock.title}>
						{contentBlock.tokens.map(parseContentBlock)}
					</a>
				</Link>
			);
		case CONTENT_BLOCK_TYPES.HEADING:
			const HeadingTag = `h${contentBlock.depth}`;

			return (
				// @ts-ignore
				<HeadingTag
					key={key}
					id={contentBlock.text
						.split(' ')
						.slice(0, 3)
						.join('_')
						.toUpperCase()}
				>
					{contentBlock.text}
				</HeadingTag>
			);
		case CONTENT_BLOCK_TYPES.LIST_ITEM:
			return (
				<li key={key}>{contentBlock.tokens.map(parseContentBlock)}</li>
			);
		case CONTENT_BLOCK_TYPES.BLOCKQUOTE:
			return (
				<blockquote key={key}>
					{contentBlock.tokens.map(parseContentBlock)}
				</blockquote>
			);
		case CONTENT_BLOCK_TYPES.LIST:
			if (contentBlock.ordered) {
				return (
					<ol key={key}>
						{contentBlock.items.map(parseContentBlock)}
					</ol>
				);
			}

			return (
				<ul key={key}>{contentBlock.items.map(parseContentBlock)}</ul>
			);
		case CONTENT_BLOCK_TYPES.IMAGE:
			const imageUrl = contentBlock.href.replace('/web/public', '');
			const urlParts = imageUrl.split('/');

			return (
				<Image
					key={key}
					src={imageUrl}
					alt={contentBlock.text}
					identifier={urlParts[urlParts.length - 1].split('.')[0]}
				/>
			);
		case CONTENT_BLOCK_TYPES.EM:
			return (
				<em key={key}>{contentBlock.tokens.map(parseContentBlock)}</em>
			);
		case CONTENT_BLOCK_TYPES.STRONG:
			return (
				<strong key={key}>
					{contentBlock.tokens.map(parseContentBlock)}
				</strong>
			);
		case CONTENT_BLOCK_TYPES.SPACE:
			return '';
		case CONTENT_BLOCK_TYPES.HTML:
			return (
				<span
					dangerouslySetInnerHTML={{ __html: contentBlock.text }}
					key={key}
				/>
			);
		case CONTENT_BLOCK_TYPES.ESCAPE:
			return (
				<React.Fragment key={key}>{contentBlock.text}</React.Fragment>
			);
		case CONTENT_BLOCK_TYPES.CODESPAN:
			return <code key={key}>{contentBlock.text}</code>;
		case CONTENT_BLOCK_TYPES.CODE:
			return <pre key={key}>{contentBlock.text}</pre>;
		case CONTENT_BLOCK_TYPES.TABLE:
			return (
				<table key={key} style={{ width: '100%' }}>
					<thead>
						<tr>
							{contentBlock.header.map((headCell, index) => (
								<td key={index}>{headCell}</td>
							))}
						</tr>
					</thead>
					<tbody>
						{contentBlock.cells.map((row, index) => (
							<tr key={index}>
								{row.map((cell, nestedIndex) => (
									<td key={nestedIndex}>
										{cell.match(/#[0-9a-f]{3,6}/g) ? (
											<>
												<span
													style={{
														width: 15,
														height: 15,
														borderRadius: 4,
														backgroundColor: cell,
														display: 'inline-block',
														marginRight: 15
													}}
												/>
												{cell}
											</>
										) : (
											cell
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			);
		default:
			console.log(contentBlock);
			return null;
	}
};

export const generateTopList = (
	contentBlocks: IContentBlock[]
): React.ReactNode[] => {
	const tuples = contentBlocks.reduce((acc, curr) => {
		switch (curr.type) {
			case CONTENT_BLOCK_TYPES.HEADING:
				if (curr.depth === 2) {
					acc.push([curr]);
				}

				if (curr.depth === 3) {
					const lastTuple = acc[acc.length - 1];

					if (lastTuple) {
						lastTuple.push(curr);
					}
				}

				break;
			case CONTENT_BLOCK_TYPES.PARAGRAPH:
			default:
				const lastTuple = acc[acc.length - 1];

				if (lastTuple) {
					lastTuple.push(curr);
				}

				break;
		}

		return acc;
	}, []);

	return tuples.map(
		([title, artist, imageBlock, ...otherBlocks]: [
			IHeadingBlock,
			IHeadingBlock,
			{ tokens: [IImageBlock] } | undefined
		]) => {
			const image = imageBlock.tokens[0];
			const finalOtherBlocks =
				otherBlocks.length && otherBlocks.length > 0
					? otherBlocks.filter(
							(otherBlock: IContentBlock) =>
								otherBlock.type !== CONTENT_BLOCK_TYPES.SPACE
					  )
					: [];

			return (
				<div className="album-block" key={artist.text + title.text}>
					<h2 className="title">{title.text}</h2>
					<h3 className="artist">{artist.text}</h3>
					<img
						src={image.href.replace('/web/public', '')}
						alt={image.text}
					/>
					{finalOtherBlocks.length > 0 && (
						<div className="snippet">
							{otherBlocks.map(parseContentBlock)}
						</div>
					)}
				</div>
			);
		}
	);
};

export const getPostArchiveFromBlogPosts = (blogPosts): IPostArchive => {
	return blogPosts.reduce((acc, post) => {
		const pathParts = post.path.replace('blog-posts/', '').split('/');
		const year = pathParts[0];
		const month = pathParts[1];

		return {
			...acc,
			[year]: {
				...acc[year],
				[month]: [
					...safeGet(acc, [year, month], []),
					{
						slug: post.slug,
						path: post.path,
						title: post.metaData.post_title
					}
				]
			}
		};
	}, {});
};
