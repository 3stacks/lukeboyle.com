import styled, { css } from 'styled-components';
import { bp } from '../../styled/mixins';
import { WIDTHS } from '../../styled/sizes';

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
		padding: 30px 0 0 0;
		max-width: 700px;
		margin: 0 auto 2rem;
		font-size: 1.8rem;
		text-align: left;
	}
`;
