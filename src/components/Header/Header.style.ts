import styled from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';
import { BareButton } from '../Button';

export const StyledHeader = styled.header`
	color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	width: 100%;
	z-index: 5;

	${BareButton} {
		padding: 0;
	}

	.smaller-icon {
	}
`;
