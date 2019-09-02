import styled from 'styled-components';

export const StyledFooter = styled.div`
	height: 60px;

	& .inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		font-size: 1.4rem;

		a {
			color: white;

			&:hover {
				color: white;
			}
		}
	}

	& .copyright {
		color: white;
		font-size: 1.4rem;
	}
`;
