import styled from 'styled-components';
import { bp } from '../styled/mixins';
import WIDTHS from '../styled/widths';

export const MaxWidthContainer = styled.div`
	${props => (props.isSmall ? 'max-width: 700px;' : 'max-width: 1000px;')}
	padding: 0 15px;
	margin: 0 auto;

	${bp(
		WIDTHS.M,
		`
		padding: 0 30px;		
	`
	)}
`;

export const ScreenReaderText = styled.span`
	position: absolute !important;
	clip: rect(1px, 1px, 1px, 1px);
`;

export const NoWrap = styled.span`
	white-space: nowrap;
`;
