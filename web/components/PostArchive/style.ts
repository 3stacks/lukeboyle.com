import styled from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';

export const Wrapper = styled.div`
	font-size: 1.5rem;

	.accordion__item + .accordion__item {
		border-top: 1px solid ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
	}

	.accordion__button {
		background-color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
		color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
		cursor: pointer;
		padding: 18px;
		width: 100%;
		text-align: left;
		border: none;
	}

	.accordion .accordion .accordion__item {
		padding-left: 20px;

		ul {
			padding-left: 20px;
		}
	}

	.accordion__button:hover {
		background-color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
		color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
	}

	.accordion__panel {
		animation: fadein 0.35s ease-in;
	}

	@keyframes fadein {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}
`;
