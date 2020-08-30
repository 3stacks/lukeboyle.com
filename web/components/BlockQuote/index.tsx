import * as React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { StyledBlockQuote } from './style';

export const BlockQuote = ({
	citation = '',
	children
}: {
	citation?: string;
	children: any;
}) => {
	return (
		<StyledBlockQuote cite={citation}>
			<FaQuoteLeft className="icon" />
			<span>{children}</span>
			<FaQuoteRight className="icon" />
		</StyledBlockQuote>
	);
};

export default BlockQuote;
