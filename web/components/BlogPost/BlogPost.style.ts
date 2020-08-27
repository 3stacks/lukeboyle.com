import styled, { css } from 'styled-components';
import { bp } from '../../styled/mixins';
import { WIDTHS } from '../../styled/sizes';
import { CUSTOM_PROPERTIES } from '../../styled/colors';

export const StyledPost = styled.article`
	max-width: 100%;
	padding: 0 0 60px;
	font-size: 1.8rem;
	text-align: left;

	& .is-centred {
		text-align: center;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		text-align: center;
	}

	h3 {
		font-size: 2.4rem;
	}

	p {
		font-size: 1.8rem;
	}

	img {
		max-width: 100%;
		height: auto;
	}

	code span {
		display: block;
	}

	blockquote {
		border-left: 5px solid ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
		padding-left: 15px;
		margin-left: 15px;
		margin-right: 0;

		${bp(
			640,
			css`
				padding-left: 30px;
				margin-left: 30px;
			`
		)}

		p {
			font-size: 2rem;
		}
	}

	& .title {
		font-size: 2.8rem;
		line-height: 1.5;
		margin-top: 0;
		text-align: center;

		${bp(
			WIDTHS.M,
			css`
				font-size: 3.5rem;
			`
		)}
	}
	& .meta {
		font-size: 1.4rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 50%;
		margin: 2rem auto;

		& .date {
			display: inline-block;
		}

		& .categories {
			list-style: none;
			display: inline-block;
			padding: 0;
			margin: 0;

			li {
				display: inline-block;
				padding: 0;
				margin: 0;
				&:not(:last-child) {
					margin-right: 15px;
				}
			}
		}
	}

	& .content {
		padding-top: 30px;
		max-width: 700px;
		margin: 0 auto 2rem;
		font-size: 1.8rem;
		text-align: left;
	}

	.album-block {
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
	}
`;
