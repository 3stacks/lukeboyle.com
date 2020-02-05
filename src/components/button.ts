import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import COLORS from '../styled/colors';

function getButtonStyles({ isSecondary }) {
	return css`
		display: inline-flex;
		align-items: center;
		${isSecondary
			? css`
					color: ${COLORS.SECONDARY};
					background-color: #fff;
					border: 2px solid ${COLORS.SECONDARY};
			  `
			: css`
					color: white;
					background-color: ${COLORS.SECONDARY};
					border: none;
			  `}

		padding: 10px 15px;
		text-decoration: none;
		text-transform: uppercase;
		font-size: 1.3rem;
		font-weight: bold;
		border: 2px solid ${COLORS.SECONDARY};

		&:hover,
		&:focus {
			color: ${COLORS.SECONDARY} !important;
			outline: none;
			background-color: #fff;
			border: 2px solid ${COLORS.SECONDARY};
			color: ${COLORS.SECONDARY};

			@media screen and (prefers-reduced-motion: no-preference) {
				transform: translate(-3px, -3px);
				box-shadow: 4px 4px 0 0 ${COLORS.SECONDARY};
			}
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
