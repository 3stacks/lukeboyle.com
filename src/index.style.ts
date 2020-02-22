import styled, { css } from 'styled-components';
import { blackShift, bp } from './styled/mixins';
import { WIDTHS } from './styled/sizes';
import {getFontSize} from "./styled/utils";

export const StyledBanner = styled.div`
	color: #111;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	flex-wrap: wrap;
	height: 200px;
	text-align: center;

	${bp(
		768,
		css`
		height: 300px;
	`
	)}
	
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.3;
	}

	h1,
	h2 {
		font-size: 4rem;
		margin: 0;

		${bp(
			WIDTHS.M,
			css`
			font-size: 6rem;
			margin: 0;
	    `
		)}
	}

	p {
		font-size: 2rem;
		padding-top: 15px;
		margin: 0;

		${bp(
			WIDTHS.M,
			css`
			padding-top: 30px;
		    font-size: 3rem;
	    `
		)}

		&:first-of-type {
			margin: 0 0 15px;
		}
	}
`;

export const RecentStuff = styled.div`
	display: grid;
	padding: 30px 0;
	grid-gap: 30px;
	grid-template-columns: 1fr;

	${bp(
		620,
		css`
		grid-template-columns: 1fr 1fr;
	`
	)}
`;

export const Stuff = styled.div`
	background-color: white;
	color: #111;
	text-align: center;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;

	a {
		margin-top: auto;
	}
	
	.block-header {
		margin-bottom: 2rem;
		${getFontSize(2.5, 1.3, 2)}
	}
	
	.title {
		${getFontSize(3.5, 1.3, 3.5)}
	}
	
	h2 {
		margin-bottom: 0;
	}

	${blackShift(5)}
`;
