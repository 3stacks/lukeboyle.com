import styled, { css } from 'styled-components';
import { getFontSize } from '../../styled/utils';
import { bp } from '../../styled/mixins';
import { WIDTHS } from '../../styled/sizes';
import { CUSTOM_PROPERTIES } from '../../styled/colors';

export const ArtistList = styled.ol`
	list-style: none;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 20px;
	margin: 0 0 2rem;
	padding: 0;
	
	${bp(
		450,
		`
		grid-template-columns: 1fr 1fr;
	`
	)}
	
	${bp(
		700,
		`
		grid-template-columns: 1fr 1fr 1fr;
	`
	)}
	
	${bp(
		920,
		`
		grid-template-columns: 1fr 1fr 1fr 1fr;
	`
	)}
	
	li {
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: translate(-5px, -5px);
        background-color: ${CUSTOM_PROPERTIES.COLOR_PRIMARY};
        box-shadow: 7px 7px 0 0 ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
        color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
        border: 2px solid ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
	}
	
	.image-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		
		img {
			max-width: 100%;
		}
	}
	.info-wrapper {
	  padding: 15px;
	  display: flex;
	  flex-direction: column;
	  height: 100%;
	}
	
	.artist-name {
		font-size: 1.7rem;
		margin: 0 0 1rem;
		text-align: center;
	} 
	.play-count {
		margin: auto 0 0;
		font-size: 1.6rem;
		text-align: center;
	}
`;

export const MainHeader = styled.h2`
	text-align: center;
	${getFontSize(3)}
`;

export const BodyWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 20px;
	padding-top: 60px;
	padding-bottom: 60px;

	div:last-of-type {
		max-width: 700px;
	}

	.left {
		align-self: start;
		padding: 0 20px 0 0;
		width: 100%;

		${bp(
			WIDTHS.M,
			`
			max-width: 230px;
		`
		)}

		${bp(
			1000,
			`
			position: sticky;
			top: -1px;
		`
		)}

		h2 {
			text-align: center;

			${bp(
				1000,
				`
				text-align: left;
				font-size: 2.8rem;
			`
			)}

			${bp(
				1027,
				`
				font-size: 3rem;
			`
			)}
		}
	}

	${bp(
		WIDTHS.M,
		`
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
			`
			text-align: left;
		`
		)}
	}

	li {
		font-size: 1.7rem;
		margin-bottom: 1rem;
	}
`;

export const AlbumBlock = styled.div`
	display: grid;
	grid-template-rows: auto;
	grid-template-areas:
		'c'
		'a'
		'b'
		'd';
	margin-bottom: 50px;
	align-items: center;
	overflow: hidden;
	background-color: ${CUSTOM_PROPERTIES.COLOR_PRIMARY};
	color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	transform: translate(-5px, -5px);
	box-shadow: 7px 7px 0 0 ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
	border: 2px solid ${CUSTOM_PROPERTIES.COLOR_SECONDARY};

	${bp(
		460,
		css`
			grid-template-columns: 3fr 1fr;
			align-items: center;
			grid-template-areas:
				'a c'
				'b c'
				'd d';
		`
	)}

	.title {
		grid-area: b;
		font-size: 2.8rem;
		margin-bottom: 20px;

		${bp(
			460,
			css`
				margin: 0 0 auto;
			`
		)}
	}

	.artist {
		grid-area: a;
		font-size: 2rem;
		margin: auto 0 0;
	}

	img {
		grid-area: c;
		margin-bottom: 20px;
		width: 100%;

		${bp(
			460,
			css`
				width: auto;
				margin-bottom: 0;
				align-self: stretch;
			`
		)}
	}

	.snippet {
		grid-area: d;
		padding: 20px;
	}
`;
