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
	padding: 16px 0;
	margin-bottom: 16px;

	a {
		color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	}

	${bp(
		WIDTHS.M,
		css`
			padding: 0;
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
			600,
			css`
				display: block;
				margin-bottom: 16px;
			`
		)}

		${bp(
			WIDTHS.M,
			css`
				width: 250px;
				text-align: left;
				margin: 0;
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
