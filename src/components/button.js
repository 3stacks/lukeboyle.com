import { Link } from 'gatsby';
import styled from 'styled-components';
import COLORS from '../styled/colors';

function getButtonStyles({ isSecondary }) {
	return `
		display: inline-flex;
		align-items: center;
		${
			isSecondary
				? `
			background-color: white;
			color: ${COLORS.PRIMARY};
			border: 1px solid white;
		`
				: `
			color: white;
			background-color: ${COLORS.PRIMARY};
		`
		}
		padding: 10px 15px;
		text-decoration: none;
		box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
		transition: transform 0.2s ease-out, background-color 0.3s ease-out, box-shadow 0.3s ease-out;
		text-transform: uppercase;
		font-size: 1.3rem;
		font-weight: bold;
		border-radius: 4px;
		
		&:hover,
		&:focus {
			${
				isSecondary
					? `
				color: ${COLORS.PRIMARY_GRADIENT_LIGHT}
				background-color: #e9e9e9;
				border: 1px solid #e9e9e9;
			`
					: `
				background-color: ${COLORS.PRIMARY_GRADIENT_LIGHT};
				color: white;
			`
			}
			transform: translateY(-1px);
			box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
			outline: none;
		}
	`;
}

export default styled.button`
	${props => getButtonStyles(props)}
`;
export const LinkButton = styled(Link)`
	${props => getButtonStyles(props)}
`;
