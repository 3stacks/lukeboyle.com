import React from 'react';
import SiteNav from '../site-nav';
import styled from 'styled-components';
import { MaxWidthContainer } from '../../styled/utils';

const StyledHeader = styled.header`
	color: white;
	width: 100%;
	z-index: 5;
`;

export default function Header({ isHome = false }) {
	return (
		<StyledHeader>
			<MaxWidthContainer>
				<SiteNav isHome={isHome} />
			</MaxWidthContainer>
		</StyledHeader>
	);
}
