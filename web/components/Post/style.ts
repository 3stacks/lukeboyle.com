import styled, { css } from 'styled-components';
import { blackShift, bp } from '../../styled/mixins';
import { CUSTOM_PROPERTIES } from '../../styled/colors';

export const Tile = styled.article`
	width: 100%;
	padding: 10px;
	${blackShift(5)};
	display: grid;
	grid-column-gap: 10px;
	grid-template-columns: 50px auto;
	grid-template-rows: 25px auto;

	${bp(
		768,
		css`
			padding: 20px;
		`
	)}

	&:not(:last-of-type) {
		margin-bottom: 15px;
		${bp(
			768,
			css`
				margin-bottom: 30px;
			`
		)}
	}

	img {
		max-width: 100%;
	}

	table {
		font-size: 1.6rem;
		margin: 1rem 0;

		td {
			padding: 5px;
			border: 2px solid ${CUSTOM_PROPERTIES.COLOR_TEXT};
		}
	}

	stream {
		margin-top: 10px;
	}

	blockquote {
		margin-top: 0;
	}
`;

export const Body = styled.div`
	width: 100%;
	grid-column: 1 / 3;
	padding: 30px 0 0 0;

	${bp(
		400,
		css`
			grid-column: 2 / 3;
			padding: 5px 0 0 0;
		`
	)}

	p {
		margin: 0;
	}
`;

export const Avatar = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;

export const Meta = styled.div`
	address {
		font-style: normal;
		display: inline;
	}

	font-size: 1.5rem;
	padding: 5px 0 0 0;

	span {
		padding: 0 5px;
	}
`;
