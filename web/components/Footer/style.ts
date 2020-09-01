import styled, { css } from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';
import { bp } from '../../styled/mixins';
import { HEADER_HEIGHT } from '../../styled/sizes';

export const FooterLinks = styled.div`
	a {
		&:not(:first-of-type) {
			margin-left: 15px;
		}
	}
`;

export const StyledFooter = styled.footer`
	height: 60px;

	& .inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.4rem;
		flex-direction: column;

		${bp(
			420,
			css`
				flex-direction: row;
				height: 100%;
			`
		)};

		a {
			color: ${CUSTOM_PROPERTIES.COLOR_TEXT};

			&:focus,
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
