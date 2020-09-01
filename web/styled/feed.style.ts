import styled, { css } from 'styled-components';
import MaxWidthContainer from '../components/MaxWidthContainer';
import { bp } from './mixins';
import { WIDTHS } from './sizes';

export const PostPageMain = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1 0;

	${MaxWidthContainer} {
		width: 100%;

		${bp(
			600,
			css`
				padding-top: 30px;
				padding-bottom: 30px;
			`
		)};

		div:last-of-type {
			max-width: 700px;
		}

		${bp(
			WIDTHS.M,
			css`
				padding-top: 60px;
				padding-bottom: 60px;
			`
		)};
	}
`;

export const PostImg = styled.div`
	margin-top: 10px;
	box-shadow: rgba(101, 119, 134, 0.2) 0 0 15px,
		rgba(101, 119, 134, 0.15) 0 0 3px 1px;
	overflow: hidden;
	display: flex;
`;
