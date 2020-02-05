import styled from 'styled-components';
import { bp } from '../../styled/mixins';
import WIDTHS from '../../styled/widths';

export const StyledNav = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	height: 60px;

	a {
		color: #111;
	}

	${bp(
		WIDTHS.M,
		`
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
			`
			display: block;
		`
		)}

		${bp(
			WIDTHS.M,
			`
            width: 250px;
            text-align: left;  
        `
		)}

		a {
			color: #111;
			text-decoration: none;

			&:hover {
				color: #111;
			}
		}
	}

	.menu {
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;
		text-align: center;
		color: #111;

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
				color: #111;
				font-size: 1.6rem;
				border-color: transparent;

				&.active,
				&:focus,
				&:hover {
					border-color: #111;
				}
			}
		}
	}
`;
