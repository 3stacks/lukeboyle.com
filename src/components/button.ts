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
			color: white;
			background-color: ${COLORS.SECONDARY};
			border: none;
		`
				: `
			color: white;
			background-color: ${COLORS.PRIMARY};
			border: none;
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
				color: white
				border: none;
			`
					: `
				color: white;
				border: none;
			`
			}
			opacity: 0.9;
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
export const AnchorButton = styled.a`
	${props => getButtonStyles(props)}
`;
