import * as React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { StyledBlockQuote } from './BlockQuote.style';

export default function BlockQuote({
    citation = '',
    children
}: {
    citation?: string;
    children: any;
}) {
    return (
        <StyledBlockQuote cite={citation}>
            <FaQuoteLeft className="icon" />
            <span>{children}</span>
            <FaQuoteRight className="icon" />
        </StyledBlockQuote>
    );
}
