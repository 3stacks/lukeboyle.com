const yellow = '#ffe01b';
const blue = 'blue';
const white = '#fff';
const black = '#111';

export interface ITheme {
	PRIMARY: string;
	WHITE: string;
	TEXT: string;
	SECONDARY: string;
}

export const DEFAULT_COLORS: ITheme = {
	PRIMARY: yellow,
	WHITE: white,
	TEXT: black,
	SECONDARY: black
};

export const ALT_COLORS: ITheme = {
	PRIMARY: white,
	WHITE: white,
	TEXT: blue,
	SECONDARY: blue
};

export const NIGHT_MODE_COLORS: ITheme = {
	PRIMARY: '#2a2438',
	WHITE: white,
	TEXT: '#352f44',
	SECONDARY: '352f44'
};

export enum CUSTOM_PROPERTIES {
	COLOR_PRIMARY = 'var(--color-primary)',
	COLOR_SECONDARY = 'var(--color-secondary)',
	COLOR_TEXT = 'var(--color-text)',
	COLOR_WHITE = 'var(--color-white)'
}

export enum THEMES {
	DEFAULT = 'DEFAULT',
	NIGHT = 'NIGHT',
	ALT = 'ALT'
}

export const COLORS = DEFAULT_COLORS;
