import styled from 'styled-components';
import WIDTHS from '../styled/widths';
import { bp } from '../styled/mixins';

export default styled.div`
	padding: 60px 0;

	& .title,
	& .blog-post--title {
		font-size: 4rem;
		text-align: center;
	}

	& .content {
		max-width: 700px;
		margin: 0 auto;
		font-size: 1.8rem;
		figure {
			margin: 0;
		}

		p {
			font-size: 1.8rem;
		}

		img {
			max-width: 100%;
		}
	}

	& .buttons {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
`;
