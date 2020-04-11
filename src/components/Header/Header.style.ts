import styled, { css } from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';
import { BareButton } from '../Button';
import { bp } from '../../styled/mixins';
import { WIDTHS } from '../../styled/sizes';

export const StyledHeader = styled.header`
	color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	width: 100%;
	z-index: 5;
	position: fixed;
	bottom: 0;
	background-color: ${CUSTOM_PROPERTIES.COLOR_PRIMARY};

	${bp(
		WIDTHS.M,
		css`
			position: static;
		`
	)};

	${BareButton} {
		padding: 0;
	}
`;
