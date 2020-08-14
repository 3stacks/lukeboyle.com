import { createGlobalStyle, css } from 'styled-components';
import { FONT_SIZES, LINE_HEIGHTS, VERTICAL_RHYTHMS, WIDTHS } from './sizes';
import { getFontSize } from './utils';
import { CUSTOM_PROPERTIES } from './colors';
import { bp } from './mixins';

export const GlobalLayoutStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}
	
	@font-face {
        font-family: 'Publico';
        font-display: swap;
     	src: url("/fonts/Publico.woff2") format('woff2'),
          url("/fonts/Publico.woff") format('woff');   
    }
    @font-face {
        font-family: 'Graphik';
        font-display: swap;
        src: url("/fonts/Graphik-Regular.woff2") format('woff2'),
          url("/fonts/Graphik-Regular.woff") format('woff');
    }

	html {
		font-size: 62.5%;
	}
	
	h1, h2, h3, h4, h5, h6, button {
		font-family: 'Publico', serif;
		font-weight: normal !important;
	}
	
	body {
		font-family: 'Graphik', 'Helvetica Neue', sans-serif;
		margin: 0;
	}
	
	pre {
        font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace;
    }
    
    * {
		line-height: ${LINE_HEIGHTS.DEFAULT};
	}
	
	h1 {
		font-size: ${FONT_SIZES.H1}rem;
		line-height: ${LINE_HEIGHTS.FLAT};
		margin-bottom: ${VERTICAL_RHYTHMS.H1}rem;
		margin-top: 0;
	}
	
	h2 {
		font-size: ${FONT_SIZES.H2}rem;
		line-height: ${LINE_HEIGHTS.FLAT};
		margin-bottom: ${VERTICAL_RHYTHMS.H2}rem;
		margin-top: 0;
	}
	
	h3 {
		font-size: ${FONT_SIZES.H3}rem;
		line-height: ${LINE_HEIGHTS.FLAT};
		margin-bottom: ${VERTICAL_RHYTHMS.H3}rem;
		margin-top: 0;
	}
	
	p {
		font-size: ${FONT_SIZES.P}rem;
		line-height: ${LINE_HEIGHTS.PROSE};
		margin-bottom: ${VERTICAL_RHYTHMS.P}rem;
		margin-top: 0;
	}
	
	.about-main {
		padding: 60px 20px;
	}
	
	ul {
	  	list-style: square;
	  	margin-top: 0;
		${getFontSize(1.8, 2)};
	}
	
	.blog-category {
		text-align: center;
		font-size: 3rem;
	}
	
	.blog-single {
		position: relative;
	}
	
	.blog-single h1 {
		margin-top: 0;
	}
	
	small {
		font-size: 1.2rem;
	}
	
	@media (min-width: 768px) {
		pre {
			font-size: 85%;
		}
	}
	
	pre {
		padding: 16px;
		overflow: auto;
		font-size: 70%;
		line-height: 1.45;
		background-color: #f7f7f7;
		border-radius: 3px;
	}
	
	header,
	footer {
		flex-grow: 0;
	}
	
	main {
		flex-grow: 1;
	}
	
	a {
		color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
		text-decoration: none;
		border-bottom: 1px solid ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
		
		&:hover, 
		&:focus {
			border-bottom: 1px solid transparent;
			background-color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
			color: ${CUSTOM_PROPERTIES.COLOR_WHITE} !important;
		}
	}
	
	.pagination {
		display: flex;
		margin: 0 auto !important;
		font-size: 1.6rem;
		width: calc(100% - 20px);
		justify-content: center;
		
		li:not(:last-of-type) {
			margin-right: 20px;
		}
		
		a {
			width: 31px;
			font-size: 2rem;
			display: inline-flex;
			justify-content: center;
		}
		
		.is-active {
			border: none;
			cursor: pointer;
			background-color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
			color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
		}
		
		${bp(
			WIDTHS.M,
			css`
				width: calc(100% - 120px);
			`
		)}
	}
	
	.pagination li {
		list-style: none;
	}
`;
