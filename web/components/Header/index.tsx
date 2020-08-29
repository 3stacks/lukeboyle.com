import React from 'react';
import SiteNav from '../SiteNav';
import MaxWidthContainer from '../MaxWidthContainer';
import { StyledHeader } from './style';

export const Header = ({
	isHome = false,
	slug
}: {
	isHome: boolean;
	slug: string;
}) => {
	return (
		<StyledHeader>
			<MaxWidthContainer style={{ height: '100%' }}>
				<SiteNav isHome={isHome} slug={slug} />
			</MaxWidthContainer>
		</StyledHeader>
	);
};

export default Header;
