import styled, { css } from 'styled-components';
import { bp } from '../../styled/mixins';
import { WIDTHS } from '../../styled/sizes';
import { CUSTOM_PROPERTIES } from '../../styled/colors';

export const Root = styled.ul`
	display: flex;
	margin: 0 auto !important;
	font-size: 1.6rem;
	width: calc(100% - 20px);
	justify-content: center;

	li {
		list-style: none;

		&:not(:last-of-type) {
			margin-right: 20px;
		}
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
`;
