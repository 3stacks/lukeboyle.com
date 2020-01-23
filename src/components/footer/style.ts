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
			color: #111;

			&:hover {
				color: #111;
				border-bottom: 1px solid #111;
			}
		}
	}

	& .copyright {
		color: white;
		font-size: 1.4rem;
	}
`;
