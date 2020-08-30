const yellow = '#ffe01b';
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

export enum CUSTOM_PROPERTIES {
	COLOR_PRIMARY = 'var(--color-primary)',
	COLOR_SECONDARY = 'var(--color-secondary)',
	COLOR_TEXT = 'var(--color-text)',
	COLOR_WHITE = 'var(--color-white)'
}
