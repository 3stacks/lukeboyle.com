import styled from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';

export const Wrapper = styled.div`
	font-size: 1.5rem;

	details {
		border-top: 1px solid ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
	}

	summary {
		background-color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
		color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
		cursor: pointer;
		padding: 18px;
		width: 100%;
		text-align: left;
		border: none;

		&:hover {
			background-color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
			color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
		}
	}

	details details {
		padding-left: 20px;

		ul {
			padding: 20px 0 20px 40px;
			list-style: bullet;

			li {
				font-size: 1.7rem;
			}
		}
	}
`;
