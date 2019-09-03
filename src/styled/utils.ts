import styled from 'styled-components';
import { bp } from './mixins';
import WIDTHS from './widths';
import COLORS from './colors';

export const MaxWidthContainer = styled.div`
	${props => (props.isSmall ? 'max-width: 700px;' : 'max-width: 1000px;')}
	padding: 0 15px;
	margin: 0 auto;

	${bp(
		WIDTHS.M,
		`
		padding: 0 30px;		
	`
	)}
`;

export const ScreenReaderText = styled.span`
	position: absolute !important;
	clip: rect(1px, 1px, 1px, 1px);
`;

export const NoWrap = styled.span`
	white-space: nowrap;
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
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
	border-radius: 4px;
	overflow: hidden;

	${bp(
		460,
		`
		grid-template-columns: 3fr 1fr;
		align-items: center;
		grid-template-areas: 
			"a c"
			"b c"
			"d d";
	`
	)}

	.title {
		grid-area: b;
		font-size: 2.8rem;
		margin-bottom: 20px;

		${bp(
			460,
			`
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
			`
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

export const BlogHeader = styled.div`
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: white;
	position: relative;
	background-color: ${COLORS.PRIMARY};
	${bp(
		WIDTHS.S,
		`
			margin-top: -60px;
			margin-bottom: 0;
			padding-top: 60px;
		`
	)}
	${bp(
		WIDTHS.M,
		`
				height: 300px;
			`
	)}
		& .site-name {
		font-size: 4rem;
		margin: 0 0 30px;

		${bp(
			WIDTHS.M,
			`
			font-size: 5rem;
		`
		)}
	}

	& .description {
		font-size: 2rem;
	}
`;

export const PortfolioItem = styled.div`
	padding: 60px 0;
	background-color: ${COLORS.WHITE};
	color: ${COLORS.TEXT};

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
`;
