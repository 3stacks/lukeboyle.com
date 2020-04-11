import styled, { css } from 'styled-components';
import { CUSTOM_PROPERTIES } from './colors';
import { bp } from './mixins';

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
			515,
			css`
				grid-template-columns: 1fr 1fr;
				grid-column-gap: 30px;
			`
		)}

		${bp(
			780,
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
