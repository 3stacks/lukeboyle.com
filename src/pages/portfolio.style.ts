import styled, { css } from 'styled-components';
import { CUSTOM_PROPERTIES } from '../styled/colors';
import { blackShift, bp } from '../styled/mixins';
import { getFontSize } from '../styled/utils';

export const PortfolioItem = styled.div`
	margin-bottom: 30px;
	color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
	display: flex;
	flex-direction: column;
	background-color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
	border: 2px solid ${CUSTOM_PROPERTIES.COLOR_PRIMARY};

	${blackShift(5)}

	& .image {
		font-size: 0;
		img {
			width: 100%;
		}
	}
	& .image {
		height: 200px;
		width: 100%;
		border-radius: 4px 4px 0 0;
		background-size: cover;
		background-repeat: no-repeat;
	}

	& .card {
		flex: 1 0;
		color: black;
		padding: 20px;
		text-align: center;
		min-height: 150px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		& .title {
			width: 100%;
			font-size: 2.5rem;
			margin-bottom: 1rem;
		}

		p {
			width: 100%;
			text-align: justify;
			${getFontSize(1.7, 1.15)}
		}

		a {
			margin-top: auto;
			font-size: 1.4rem;
		}
	}
`;

export const PortfolioContainer = styled.div`
	padding-top: 30px;

	h1 {
		margin-top: 0;
		font-size: 3.5rem;
		text-align: center;
		margin-bottom: 30px;
	}

	& .inner {
		display: grid;
		grid-template-columns: 1fr;
		margin-bottom: 30px;

		${bp(
			600,
			css`
				grid-template-columns: 1fr 1fr;
				grid-column-gap: 30px;
			`
		)}

		${bp(
			800,
			css`
				grid-template-columns: 1fr 1fr 1fr;
			`
		)}
	}
`;

export const PortfolioContent = styled.div`
padding: 60px 0;
background-color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	& .title,
	& .blog-post--title {
	        font-size: 4rem;
	        text-align: center;
	}
	& .content {
	        max-width: 700px;
	        margin: 0 auto;
	        font-size: 1.8rem;
	        figure {
		                margin: 0;
		        }
			        p {
		                font-size: 1.8rem;
		        }
			        img {
		                max-width: 100%;
		        }
	}
	& .buttons {
	        display: flex;
	        justify-content: space-between;
	        width: 100%;
	}
-`;
