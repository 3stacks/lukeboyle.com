import { css } from 'styled-components';
import { CUSTOM_PROPERTIES } from './colors';

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
			background-color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
			color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
			border: 2px solid ${CUSTOM_PROPERTIES.COLOR_SECONDARY};

			@media screen and (prefers-reduced-motion: no-preference) {
				transform: translate(-${distance}px, -${distance}px);
				box-shadow: ${distance + 2}px ${distance + 2}px 0 0
					${CUSTOM_PROPERTIES.COLOR_SECONDARY};
			}
		}
	`;
}
