import styled, { css } from 'styled-components';
import { bp } from '../../styled/mixins';
import { WIDTHS } from '../../styled/sizes';

const MaxWidthContainer = styled.div<{ isSmall?: boolean }>`
	${props =>
		props.isSmall
			? css`
					max-width: 700px;
			  `
			: css`
					max-width: 1000px;
			  `};
	padding: 0 15px;
	margin: 0 auto;

	${bp(
		WIDTHS.M,
		css`
			padding: 0 30px;
		`
	)}
`;

export default MaxWidthContainer;
