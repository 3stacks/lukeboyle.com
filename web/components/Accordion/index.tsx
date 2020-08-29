import * as React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { StyledDetails, StyledSummary } from './style';
import { IProps } from './types';

export const Accordion: React.FC<IProps> = ({ summary, children }) => {
	return (
		<StyledDetails>
			<StyledSummary>
				<FaChevronRight />
				{summary}
			</StyledSummary>
			<div className="contents">{children}</div>
		</StyledDetails>
	);
};

export default Accordion;
