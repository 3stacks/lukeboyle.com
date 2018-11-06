import styled from 'styled-components';
import {bp} from '../styled/mixins';
import WIDTHS from '../styled/widths';

export const MaxWidthContainer = styled.div`
	max-width: 1000px;
	padding: 0 15px;
	margin: 0 auto;
	${bp(WIDTHS.M, `
		padding: 0 30px;		
	`)}
`;