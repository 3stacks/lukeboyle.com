import styled, { css } from 'styled-components';
import { CUSTOM_PROPERTIES, DEFAULT_COLORS } from '../../styled/colors';
import { HEADER_HEIGHT } from '../../styled/sizes';
import { bp } from '../../styled/mixins';

export const StyledLayout = styled.div<{
	showFullPageColor: boolean;
}>`
	--color-primary: ${DEFAULT_COLORS.PRIMARY};
	--color-secondary: ${DEFAULT_COLORS.SECONDARY};
	--color-white: ${DEFAULT_COLORS.WHITE};
	--color-text: ${DEFAULT_COLORS.TEXT};
	margin: 0;
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
	color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
	background-color: ${CUSTOM_PROPERTIES.COLOR_PRIMARY};
	padding-bottom: ${HEADER_HEIGHT}px;

	${bp(
		600,
		css`
			padding-bottom: 0;
		`
	)}

	[data-identifier='google-fasc'] {
		${bp(
			768,
			css`
				display: block;
				max-width: 70%;
				margin: 0 auto;
			`
		)}
	}

	${props =>
		!props.showFullPageColor &&
		css`
			.main {
				background-color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
				color: ${CUSTOM_PROPERTIES.COLOR_TEXT};
			}
		`}

	dl {
		display: grid;
		grid-template-columns: 1fr 3fr;
		font-size: 1.8rem;

		dt {
			font-weight: bold;
		}
	}
`;
