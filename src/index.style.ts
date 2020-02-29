import styled, { css } from 'styled-components';
import { blackShift, bp } from './styled/mixins';
import { getFontSize } from './styled/utils';
import { CUSTOM_PROPERTIES } from './styled/colors';

export const RecentStuff = styled.div`
	display: grid;
	padding: 30px 0;
	grid-gap: 30px;
	grid-template-columns: 1fr;

	${bp(
		620,
		css`
			grid-template-columns: 1fr 1fr;
		`
	)}
`;

export const Stuff = styled.div`
	background-color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
	color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	text-align: center;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;

	a {
		margin-top: auto;
	}

	.block-header {
		margin-bottom: 2rem;
		${getFontSize(2.5, 1.3, 2)}
	}

	.title {
		${getFontSize(3.5, 1.3, 3.5)}
	}

	h2 {
		margin-bottom: 0;
	}

	${blackShift(5)}
`;
