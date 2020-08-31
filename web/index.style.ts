import styled, { css } from 'styled-components';
import { blackShift, bp } from './styled/mixins';
import { getFontSize } from './styled/utils';

export const RecentStuff = styled.div`
	display: grid;
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
	text-align: center;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	${blackShift(5)}

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
`;
