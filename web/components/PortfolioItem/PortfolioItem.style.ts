import styled from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';
import { blackShift } from '../../styled/mixins';
import { getFontSize } from '../../styled/utils';

export const PortfolioPageItem = styled.div`
	display: flex;
	flex-direction: column;
	border: 2px solid ${CUSTOM_PROPERTIES.COLOR_PRIMARY};

	&:not(:last-of-type) {
		margin-bottom: 30px;
	}

	${blackShift(5)}

	& .image {
		font-size: 0;
		img {
			width: 100%;
		}
	}
	& .image {
		height: 200px;
		width: 100%;
		border-radius: 4px 4px 0 0;
		background-size: cover;
		background-repeat: no-repeat;
	}

	& .card {
		flex: 1 0;
		color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
		padding: 20px;
		text-align: center;
		min-height: 150px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		& .title {
			width: 100%;
			font-size: 2.5rem;
			margin-bottom: 1rem;
		}

		p {
			width: 100%;
			text-align: justify;
			${getFontSize(1.7, 1.15)};
		}

		a {
			font-size: 1.4rem;
		}
	}
`;
