export enum WIDTHS {
	XS = 320,
	S = 480,
	M = 768,
	L = 992,
	XL = 1200
}

export enum FONT_SIZES {
	H1 = 4,
	H2 = 3.5,
	H3 = 2.8,
	P = 1.8
}

export enum LINE_HEIGHTS {
	FLAT = 1,
	DEFAULT = 1.5,
	HEADINGS = 1.3,
	PROSE = 1.7
}

export enum VERTICAL_RHYTHMS {
	H1 = FONT_SIZES.H1 * LINE_HEIGHTS.FLAT,
	H2 = FONT_SIZES.H2 * LINE_HEIGHTS.FLAT,
	H3 = FONT_SIZES.H3 * LINE_HEIGHTS.FLAT,
	P = FONT_SIZES.P * LINE_HEIGHTS.PROSE
}

export const HEADER_HEIGHT = 80;
