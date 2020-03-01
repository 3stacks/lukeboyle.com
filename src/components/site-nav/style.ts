import styled, { css } from 'styled-components';
import { bp } from '../../styled/mixins';
import { WIDTHS } from '../../styled/sizes';
import { CUSTOM_PROPERTIES } from '../../styled/colors';

export const StyledNav = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	height: 60px;

	a {
		color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	}

	${bp(
		WIDTHS.M,
		css`
			flex-wrap: nowrap;
		`
	)}

	& .logo {
		margin: 0;
		font-size: 2.5rem;
		font-family: 'Publico', serif;
		width: 100%;
		text-align: center;
		display: none;

		${bp(
			WIDTHS.M,
			css`
				display: block;
				width: 250px;
				text-align: left;
			`
		)};

		a {
			color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
			text-decoration: none;
			border-color: transparent;

			&:hover {
				color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
			}
		}
	}

	.menu {
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;
		text-align: center;
		color: ${CUSTOM_PROPERTIES.COLOR_TEXT};

		${bp(
			WIDTHS.M,
			css`
				text-align: right;
			`
		)};

		& .item {
			display: inline-block;
			margin: 0;

			&:not(:last-child) {
				margin-right: 15px;
			}

			a {
				color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
				font-size: 1.6rem;
				border-color: transparent;
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
