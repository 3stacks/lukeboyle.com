import styled from 'styled-components';
import COLORS from '../../styled/colors';

export const StyledFooter = styled.div`
	height: 60px;

	& .inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		font-size: 1.4rem;

		a {
			color: ${COLORS.SECONDARY};

			&:hover {
				color: ${COLORS.SECONDARY};
				border-bottom: 1px solid #111;
			}
		}
	}

	& .copyright {
		color: ${COLORS.SECONDARY};
		font-size: 1.4rem;
	}
`;
