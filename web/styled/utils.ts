import { css, FlattenSimpleInterpolation } from 'styled-components';
import { LINE_HEIGHTS } from './sizes';

export function getFontSize(
	fontSize: number,
	lineHeight: LINE_HEIGHTS = LINE_HEIGHTS.DEFAULT,
	marginBottom?: number
): FlattenSimpleInterpolation {
	return css`
		font-size: ${fontSize}rem;
		line-height: ${lineHeight};
		margin-bottom: ${marginBottom
			? marginBottom
			: fontSize * lineHeight}rem;
	`;
}
