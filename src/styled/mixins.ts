import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { CUSTOM_PROPERTIES } from './colors';

export const ScreenReaderText = styled.span`
	position: absolute !important;
	clip: rect(1px, 1px, 1px, 1px);
`;

export const NoWrap = styled.span`
	white-space: nowrap;
`;

export function bp(
	size: number,
	content: FlattenSimpleInterpolation
): FlattenSimpleInterpolation {
	return css`
		@media (min-width: ${size}px) {
			${content}
		}
	`;
}

export function blackShift(distance: number): FlattenSimpleInterpolation {
	return css`
		background-color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
		color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
		border: 2px solid ${CUSTOM_PROPERTIES.COLOR_SECONDARY};

		@media screen and (prefers-reduced-motion: no-preference) {
			transform: translate(-${distance}px, -${distance}px);
			box-shadow: ${distance + 2}px ${distance + 2}px 0 0
				${CUSTOM_PROPERTIES.COLOR_SECONDARY};
		}
	`;
}
