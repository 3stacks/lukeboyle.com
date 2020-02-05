import { css } from 'styled-components';
import COLORS from './colors';

export function bp(size, content) {
	return `
		@media (min-width: ${size}px) {
			${content}
		};
	`;
}

export function blackShift(distance: number): string {
	return css`
		&:hover {
			background-color: ${COLORS.WHITE};
			color: ${COLORS.SECONDARY};
			border: 2px solid ${COLORS.SECONDARY};

			@media screen and (prefers-reduced-motion: no-preference) {
				transform: translate(-${distance}px, -${distance}px);
				box-shadow: ${distance + 2}px ${distance + 2}px 0 0
					${COLORS.SECONDARY};
			}
		}
	`;
}
