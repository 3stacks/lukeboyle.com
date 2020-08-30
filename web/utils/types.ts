export enum CONTENT_BLOCK_TYPES {
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

export interface IBlockquoteBlock {
	type: CONTENT_BLOCK_TYPES.BLOCKQUOTE;
	raw: string;
	text: string;
	tokens: IContentBlock[];
}

export interface IHTMLBlock {
	type: CONTENT_BLOCK_TYPES.HTML;
	raw: string;
	pre: boolean;
	text: string;
}

export interface IStrongBlock {
	type: CONTENT_BLOCK_TYPES.STRONG;
	raw: string;
	text: string;
	tokens: IContentBlock[];
}

export interface IEMBlock {
	type: CONTENT_BLOCK_TYPES.EM;
	raw: string;
	text: string;
	tokens: IContentBlock[];
}

export interface IEscapeBlock {
	type: CONTENT_BLOCK_TYPES.ESCAPE;
	raw: string;
	text: string;
}

export interface IImageBlock {
	type: CONTENT_BLOCK_TYPES.IMAGE;
	raw: string;
	href: string;
	title: string;
	text: string;
}

export interface ITableBlock {
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

export interface IHeadingBlock {
	type: CONTENT_BLOCK_TYPES.HEADING;
	raw: string;
	depth: number;
	text: string;
	tokens: ITextBlock[];
}

export interface IListBlock {
	type: CONTENT_BLOCK_TYPES.LIST;
	raw: string;
	ordered: boolean;
	start: string;
	loose: boolean;
	items: [];
}

export interface IListItemBlock {
	type: CONTENT_BLOCK_TYPES.LIST_ITEM;
	raw: string;
	task: boolean;
	loose: boolean;
	text: string;
	tokens: any[];
}

export interface ISpaceBlock {
	type: CONTENT_BLOCK_TYPES.SPACE;
	raw: string;
}

export interface IParagraphBlock {
	type: CONTENT_BLOCK_TYPES.PARAGRAPH;
	raw: string;
	text: string;
	tokens: object[];
}

export interface ILinkBlock {
	type: CONTENT_BLOCK_TYPES.LINK;
	raw: string;
	href: string;
	title: string | null;
	text: string;
	tokens: IContentBlock[];
}

export interface ITextBlock {
	type: CONTENT_BLOCK_TYPES.TEXT;
	raw: string;
	text: string;
	tokens?: IContentBlock[];
}

export interface ICodeBlock {
	type: CONTENT_BLOCK_TYPES.CODE;
	raw: string;
	codeBlockStyle: string;
	text: string;
}

export interface ICodespanBlock {
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
