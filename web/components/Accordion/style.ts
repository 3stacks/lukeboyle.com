import styled from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';

export const StyledSummary = styled.summary`
	display: flex;
	align-items: center;
	cursor: pointer;
	list-style-type: none;
	padding: 5px;

	svg {
		font-size: 1.6rem;
		margin-right: 15px;
		transition: transform 0.25s ease-out;
	}

	h3 {
		margin: 0;
	}

	&::-webkit-details-marker {
		display: none;
	}
`;

export const StyledDetails = styled.details`
	&[open] {
		summary svg {
			transform: rotate(90deg);
		}

		.contents {
			opacity: 1;
			transform: translateX(0);
		}
	}

	summary:focus {
		position: relative;
		outline: none;

		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			height: calc(100% - 10px);
			width: calc(100% - 10px);
			border: 5px solid ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
		}
	}

	summary:hover {
		background-color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
		color: white;
	}

	.contents {
		position: relative;
		opacity: 0;
		transform: translateX(-10px);
		transition: opacity 0.2s ease-out, transform 0.2s ease-out;
	}
`;
