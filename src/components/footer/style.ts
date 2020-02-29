import styled from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';

export const StyledFooter = styled.div`
	height: 60px;

	& .inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		font-size: 1.4rem;

		a {
			color: ${CUSTOM_PROPERTIES.COLOR_TEXT};

			&:hover {
				color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
				border-bottom: 1px solid #111;
			}
		}
	}

	& .copyright {
		color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
		font-size: 1.4rem;
	}
`;
