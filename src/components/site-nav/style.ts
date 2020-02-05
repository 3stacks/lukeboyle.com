import styled, { css } from 'styled-components';
import { bp } from '../../styled/mixins';
import WIDTHS from '../../styled/widths';
import COLORS from '../../styled/colors';

export const StyledNav = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	height: 60px;

	a {
		color: ${COLORS.TEXT};
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
			768,
			css`
				display: block;
			`
		)}

		${bp(
			WIDTHS.M,
			css`
				width: 250px;
				text-align: left;
			`
		)}

		a {
			color: ${COLORS.TEXT};
			text-decoration: none;
			border-color: transparent;

			&:hover {
				color: ${COLORS.TEXT};
			}
		}
	}

	.menu {
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;
		text-align: center;
		color: ${COLORS.TEXT};

		${bp(
			WIDTHS.M,
			`
            text-align: right;
        `
		)}

		& .item {
			display: inline-block;
			margin: 0;

			&:not(:last-child) {
				margin-right: 15px;
			}

			a {
				color: ${COLORS.TEXT};
				font-size: 1.6rem;
				border-color: transparent;
			}
		}
	}
`;
