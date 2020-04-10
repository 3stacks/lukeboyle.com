import styled, { css } from 'styled-components';
import { WIDTHS } from '../../styled/sizes';
import { bp } from '../../styled/mixins';
import { getFontSize } from '../../styled/utils';

export const StyledBlockQuote = styled.blockquote`
	display: inline-flex;
	${getFontSize(1.9, 1.5)};
	font-size: 1.9rem;
	line-height: 1.5;
	font-family: 'Publico', sans-serif;

	${bp(
		WIDTHS.M,
		css`
			font-size: 2.4rem;
		`
	)}

	p {
		margin: 0;
	}

	& .icon {
		width: 30px;

		&:first-of-type {
			margin-right: 5px;
		}

		&:last-of-type {
			margin-left: 5px;
			align-self: flex-end;
		}
	}
`;
