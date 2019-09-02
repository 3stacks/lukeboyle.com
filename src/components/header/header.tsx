import React from 'react';
import SiteNav from '../site-nav';
import { MaxWidthContainer } from '../../styled/utils';
import {StyledHeader} from './style';

export default function Header({ isHome = false }) {
	return (
		<StyledHeader>
			<MaxWidthContainer>
				<SiteNav isHome={isHome} />
			</MaxWidthContainer>
		</StyledHeader>
	);
}
