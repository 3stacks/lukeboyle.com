import styled from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';

export const StyledHeader = styled.header`
	color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	width: 100%;
	z-index: 5;

	.icon {
		width: 25px;
		height: 25px;
	}
`;
