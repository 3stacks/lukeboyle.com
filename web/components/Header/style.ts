import styled, { css } from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';
import { BareButton } from '../Button';
import { bp } from '../../styled/mixins';
import { HEADER_HEIGHT, WIDTHS } from '../../styled/sizes';

export const StyledHeader = styled.header`
	color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	width: 100%;
	z-index: 5;
	position: fixed;
	bottom: 0;
	background-color: ${CUSTOM_PROPERTIES.COLOR_PRIMARY};
	height: ${HEADER_HEIGHT}px;
	padding-bottom: 0;
	border-top: 2px solid ${CUSTOM_PROPERTIES.COLOR_TEXT};

	${bp(
		600,
		css`
			height: ${HEADER_HEIGHT}px !important;
			position: static;
			border-top: none;
		`
	)};

	${BareButton} {
		padding: 0;
	}
`;

export const StyledNav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	flex-wrap: wrap;
	padding: 16px 0;
	height: 100%;

	a {
		color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	}

	${bp(
		WIDTHS.M,
		css`
			align-items: center;
			flex-wrap: nowrap;
		`
	)}

	& .logo {
		margin: 0;
		font-size: 2.5rem;
		line-height: 1;
		font-family: 'Publico', serif;
		width: auto;
		text-align: center;
		display: none;
		color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
		text-decoration: none;
		border-color: transparent;
		white-space: nowrap;

		&:focus,
		&:hover {
			color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
		}

		${bp(
			600,
			css`
				display: block;
				margin-bottom: 16px;
			`
		)}

		${bp(
			WIDTHS.M,
			css`
				text-align: left;
				margin: 0;
			`
		)};

		a {
		}
	}

	.menu {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;
		color: ${CUSTOM_PROPERTIES.COLOR_TEXT};

		${bp(
			WIDTHS.M,
			css`
				justify-content: flex-end;
			`
		)};

		& .item {
			display: inline-block;
			margin: 0;
			line-height: 1;

			&:not(:last-child) {
				margin-right: 8px;
				${bp(
					600,
					css`
						margin-right: 15px;
					`
				)};
			}

			a {
				color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
				font-size: 1.4rem;
				border-color: transparent;
				line-height: 1;

				${bp(
					362,
					css`
						font-size: 1.6rem;
					`
				)};
			}

			&.is-active {
				a {
					color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
					background-color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
				}
			}
		}
	}
`;
