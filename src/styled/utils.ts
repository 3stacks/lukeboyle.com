import styled, { css } from 'styled-components';
import { bp } from './mixins';
import { LINE_HEIGHTS, WIDTHS } from './sizes';
import { CUSTOM_PROPERTIES } from './colors';

export function getFontSize(
	fontSize: number,
	lineHeight: LINE_HEIGHTS = LINE_HEIGHTS.DEFAULT,
	marginBottom?: number
): string {
	return css`
		font-size: ${fontSize}rem;
		line-height: ${lineHeight};
		margin-bottom: ${marginBottom
			? marginBottom
			: fontSize * lineHeight}rem;
	`;
}
