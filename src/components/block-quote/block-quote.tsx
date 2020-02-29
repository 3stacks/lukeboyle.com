import * as React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { StyledBlockQuote } from './style';

export default function BlockQuote({
    citation = '',
    children
}: {
    citation?: string;
    children: React.ReactElement;
}) {
    return (
        <StyledBlockQuote cite={citation}>
            <FaQuoteLeft className="icon" />
            <span>{children}</span>
            <FaQuoteRight className="icon" />
        </StyledBlockQuote>
    );
}
