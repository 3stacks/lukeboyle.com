import styled, {
	createGlobalStyle,
	css,
	FlattenSimpleInterpolation
} from 'styled-components';
import graphikWoff from '../../assets/fonts/Graphik-Regular.woff';
import graphikWoffTwo from '../../assets/fonts/Graphik-Regular.woff2';
import publicoWoff from '../../assets/fonts/Publico.woff';
import publicoWoffTwo from '../../assets/fonts/Publico.woff2';
import {
	ALT_COLORS,
	COLORS,
	CUSTOM_PROPERTIES,
	ITheme,
	NIGHT_MODE_COLORS
} from '../../styled/colors';
import {
	FONT_SIZES,
	LINE_HEIGHTS,
	VERTICAL_RHYTHMS,
	WIDTHS
} from '../../styled/sizes';
import { bp } from '../../styled/mixins';
import { getFontSize } from '../../styled/utils';
import { THEMES } from '../../styled/colors';

export const GlobalLayoutStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}
	
	@font-face {
        font-family: 'Publico';
        font-display: swap;
        src: url(${publicoWoffTwo}) format('woff2'),
          url(${publicoWoff}) format('woff');
    }
    @font-face {
        font-family: 'Graphik';
        font-display: swap;
        src: url(${graphikWoffTwo}) format('woff2'),
          url(${graphikWoff}) format('woff');
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
		
		li:first-of-type {
			margin-right: 20px;
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

function yankThoseColors(colorTheme: ITheme): FlattenSimpleInterpolation {
	return css`
		--color-primary: ${colorTheme.PRIMARY};
		--color-secondary: ${colorTheme.SECONDARY};
		--color-white: ${colorTheme.WHITE};
		--color-text: ${colorTheme.TEXT};
	`;
}

function getThemeVariables(whichTheme: THEMES) {
	const palettes = {
		[THEMES.DEFAULT]: COLORS,
		[THEMES.NIGHT]: NIGHT_MODE_COLORS,
		[THEMES.ALT]: ALT_COLORS
	};

	return yankThoseColors(palettes[whichTheme]);
}

export const StyledLayout = styled.div<{
	activeTheme: THEMES;
	showFullPageColor: boolean;
}>`
	${({ activeTheme }) => getThemeVariables(activeTheme)};
	margin: 0;
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
	color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	background-color: ${CUSTOM_PROPERTIES.COLOR_PRIMARY};

	.block-header {
		font-size: 2.5rem;
	}

	.title {
		font-size: 3.5rem;
	}

	${props =>
		!props.showFullPageColor &&
		css`
			.main {
				background-color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
				color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
			}
		`}
`;
