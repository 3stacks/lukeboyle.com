import COLORS from './colors';

export function putInRows(itemsPerRow, spacingSize) {
	return `
		width: calc(${100 / itemsPerRow}% - ${(spacingSize / itemsPerRow) *
		(itemsPerRow - 1)});
		height: calc(${100 / itemsPerRow}% - ${(spacingSize / itemsPerRow) *
		(itemsPerRow - 1)});
		margin-bottom: $spacing-size;
	`;
}

export const background = `
	background-color: #2E539B;
`;

export function bp(size, content) {
	return `
		@media (min-width: ${size}px) {
			${content}
		};
	`;
}

export const triangle = `
	height: 0;
	content: "";
	position: absolute;
	left: 0;
	display: block;
	z-index: 1;
	width: 0;
`;

export const topTriangle = `
	position: relative;
	&:before {
		${triangle}
		top: 0;
		border-bottom: 50px solid transparent;
		border-right: 110vw solid #fff;
		border-left: none;
	}
`;

export const bottomTriangle = `
	position: relative;
	&:after {
		${triangle}
		bottom: 0;
		border-top: 50px solid transparent;
		border-left: 110vw solid #fff;
	}
`;
