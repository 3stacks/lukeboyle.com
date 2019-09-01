import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import styled from 'styled-components';
import WIDTHS from '../styled/widths';
import { bp } from '../styled/mixins';

const StyledBlockQuote = styled.blockquote`
	display: inline-flex;
	font-size: 1.9rem;
	line-height: 1.5;
	font-family: 'Roboto Slab';

	${bp(
		WIDTHS.M,
		`
		font-size: 2.4rem;
	`
	)}

	p {
		margin: 0;
	}

	& .icon {
		width: 20px;
		height: 20px;
		transform: translateY(-10px);

		&:first-of-type {
			margin-right: 5px;
		}

		&:last-of-type {
			margin-left: 5px;
		}
	}
`;

export default function BlockQuote({ citation, children }) {
	return (
		<StyledBlockQuote className="block-quote" cite={citation}>
			<FaQuoteLeft className="icon" />
			<span className="body">{children}</span>
			<FaQuoteRight className="icon" />
		</StyledBlockQuote>
	);
}
