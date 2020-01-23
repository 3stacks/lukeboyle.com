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
			color: ${COLORS.SECONDARY};
			background-color: #fff;
			border: 2px solid ${COLORS.SECONDARY};;
		`
				: `
			color: white;
			background-color: ${COLORS.SECONDARY};
			border: none;
		`
		}
		padding: 10px 15px;
		text-decoration: none;
		transition: transform 0.2s ease-out, background-color 0.3s ease-out, box-shadow 0.3s ease-out;
		text-transform: uppercase;
		font-size: 1.3rem;
		font-weight: bold;
		
		&:hover,
		&:focus {
			${
				isSecondary
					? `
					color: white;
					background-color: ${COLORS.SECONDARY};
					border: 2px solid ${COLORS.SECONDARY}
			`
					: `
				color: ${COLORS.SECONDARY};
				border: 2px solid ${COLORS.SECONDARY};
			`
			}
			opacity: 0.9;
			outline: none;
			transform: translate(-3px,-3px);
        	background-color: #fff;
        	box-shadow: 4px 4px 0 0 ${COLORS.SECONDARY};
			color: ${COLORS.SECONDARY};
		}
	`;
}

export default styled.button`
	${props => getButtonStyles(props)}
`;
export const LinkButton = styled(Link)`
	${props => getButtonStyles(props)}
`;
