import styled, { css } from 'styled-components';
import { getFontSize } from './utils';
import { blackShift, bp } from './mixins';
import { WIDTHS } from './sizes';
import { CUSTOM_PROPERTIES } from './colors';

export const ArtistList = styled.ol`
	list-style: none;
	display: grid;
	grid-template-columns: 1fr;
	margin: 0;
	padding: 0;

	li {
		display: flex;
		align-items: center;
		margin: 0;
		color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
	}

	.image-wrapper {
		width: 70px;
		height: 70px;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.info-wrapper {
		padding: 0 0 0 10px;
		display: flex;
		flex-direction: column;
	}

	.artist-name {
		font-size: 1.7rem !important;
		margin: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.play-count {
		margin: 0;
		font-size: 1.6rem;
		text-align: left;
	}
`;

export const MainHeader = styled.h2`
	text-align: center;
	padding: 20px;
	margin: 0 !important;
	${getFontSize(3)}
`;

export const BodyWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 20px;
	padding-top: 0;
	padding-bottom: 0;

	${bp(
		600,
		css`
			padding-top: 0;
			padding-bottom: 30px;
		`
	)};

	div:last-of-type {
		max-width: 700px;
	}

	${bp(
		WIDTHS.M,
		css`
			padding-top: 0;
			padding-bottom: 60px;
		`
	)};

	.left {
		align-self: start;
		width: 100%;
		${blackShift(5)};

		${bp(
			WIDTHS.M,
			css`
				width: 250px;
			`
		)}

		${bp(
			1000,
			css`
				position: sticky;
				top: -1px;
			`
		)}
	}

	${bp(
		WIDTHS.M,
		css`
			grid-template-columns: 1fr 3fr;
		`
	)}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		text-align: center;

		${bp(
			1000,
			css`
				text-align: left;
			`
		)}
	}

	li {
		font-size: 1.7rem;
	}
`;
