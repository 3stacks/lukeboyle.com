import * as React from 'react';
import Link from 'next/link';
import Image from '../components/Image';

enum CONTENT_BLOCK_TYPES {
	PARAGRAPH = 'paragraph',
	HEADING = 'heading',
	SPACE = 'space',
	TEXT = 'text',
	LINK = 'link',
	IMAGE = 'image',
	LIST = 'list',
	LIST_ITEM = 'list_item',
	ESCAPE = 'escape',
	HTML = 'html',
	EM = 'em',
	STRONG = 'strong',
	CODE = 'code',
	CODESPAN = 'codespan',
	BLOCKQUOTE = 'blockquote',
	TABLE = 'table'
}

interface IBlockquoteBlock {
	type: CONTENT_BLOCK_TYPES.BLOCKQUOTE;
	raw: string;
	text: string;
	tokens: IContentBlock[];
}

interface IHTMLBlock {
	type: CONTENT_BLOCK_TYPES.HTML;
	raw: string;
	pre: boolean;
	text: string;
}

interface IStrongBlock {
	type: CONTENT_BLOCK_TYPES.STRONG;
	raw: string;
	text: string;
	tokens: IContentBlock[];
}

interface IEMBlock {
	type: CONTENT_BLOCK_TYPES.EM;
	raw: string;
	text: string;
	tokens: IContentBlock[];
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

interface ITableBlock {
	type: CONTENT_BLOCK_TYPES.TABLE;
	header: string[];
	align: string | null[];
	cells: string[][];
	raw: string;
	tokens: {
		header: IContentBlock[][];
		cells: IContentBlock[][];
	};
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
	tokens?: IContentBlock[];
}

interface ICodeBlock {
	type: CONTENT_BLOCK_TYPES.CODE;
	raw: string;
	codeBlockStyle: string;
	text: string;
}

interface ICodespanBlock {
	type: CONTENT_BLOCK_TYPES.CODESPAN;
	raw: string;
	text: string;
}

export type IContentBlock =
	| IParagraphBlock
	| ISpaceBlock
	| ITextBlock
	| ILinkBlock
	| IImageBlock
	| IHeadingBlock
	| IListBlock
	| IListItemBlock
	| IEscapeBlock
	| IEMBlock
	| IHTMLBlock
	| ICodeBlock
	| ICodespanBlock
	| IBlockquoteBlock
	| IStrongBlock
	| ITableBlock;

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
									<td key={nestedIndex}>{cell}</td>
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
