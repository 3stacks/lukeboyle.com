import styled, { css } from 'styled-components';
import { blackShift } from '../../styled/mixins';
import { getFontSize } from '../../styled/utils';

export const PostPreview = styled.div`
	padding: 20px;
	${blackShift(5)};
	margin-bottom: 20px;

	h2 {
		${getFontSize(3)};
		margin-bottom: 0;
	}

	p {
		margin-bottom: 0;
	}
`;
