import styled, { css } from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';
import { bp } from '../../styled/mixins';

export const FooterLinks = styled.div`
	a {
		&:not(:first-of-type) {
			margin-left: 15px;
		}
	}
`;

export const StyledFooter = styled.div`
	height: 100px;

	${bp(
		600,
		css`
			height: 60px;
		`
	)};

	& .inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		font-size: 1.4rem;

		a {
			color: ${CUSTOM_PROPERTIES.COLOR_TEXT};

			&:hover {
				color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
				border-bottom: 1px solid ${CUSTOM_PROPERTIES.COLOR_TEXT};
			}
		}
	}

	& .copyright {
		color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
		font-size: 1.4rem;
	}
`;
