import styled, { css } from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';
import { bp } from '../../styled/mixins';
import { WIDTHS } from '../../styled/sizes';
import MaxWidthContainer from '../MaxWidthContainer';

export const StyledBanner = styled.div<{ hasColor: boolean }>`
	color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	flex-wrap: wrap;
	text-align: center;
	padding: 30px 0;

	${({ hasColor }) =>
		hasColor &&
		css`
			background-color: ${CUSTOM_PROPERTIES.COLOR_PRIMARY};
		`};

	${bp(
		768,
		css`
			padding: 0;
			height: 200px;
		`
	)}

	${MaxWidthContainer} {
		max-width: 800px;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.3;
	}

	h1,
	h2 {
		font-size: 4rem;
		margin: 0;

		${bp(
			WIDTHS.M,
			css`
				font-size: 6rem;
				margin: 0;
			`
		)}
	}

	p {
		font-size: 2rem;
		padding-top: 15px;
		margin: 0;

		${bp(
			WIDTHS.M,
			css`
				padding-top: 30px;
				font-size: 3rem;
			`
		)}

		&:first-of-type {
			margin: 0 0 15px;
		}
	}
`;
