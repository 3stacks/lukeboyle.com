import * as React from 'react';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledBanner } from './style';

export const HomeHeadBanner = ({
	children,
	hasColor
}: {
	children: React.ReactNode;
	hasColor: boolean;
}) => {
	return (
		<StyledBanner hasColor={hasColor}>
			<MaxWidthContainer>{children}</MaxWidthContainer>
		</StyledBanner>
	);
};

export default HomeHeadBanner;
