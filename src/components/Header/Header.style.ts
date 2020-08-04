import styled, { css } from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';
import { BareButton } from '../Button';
import { bp } from '../../styled/mixins';
import { HEADER_HEIGHT, WIDTHS } from '../../styled/sizes';

export const StyledHeader = styled.header`
	color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	width: 100%;
	z-index: 5;
	position: fixed;
	bottom: 0;
	background-color: ${CUSTOM_PROPERTIES.COLOR_PRIMARY};
	height: 80px;
	padding-bottom: 0;
	border-top: 2px solid ${CUSTOM_PROPERTIES.COLOR_TEXT};

	${bp(
		600,
		css`
			height: ${HEADER_HEIGHT}px !important;
			position: static;
			border-top: none;
		`
	)};

	${BareButton} {
		padding: 0;
	}
`;
