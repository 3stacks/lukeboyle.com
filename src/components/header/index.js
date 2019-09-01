import React from 'react';
import SiteNav from '../site-nav';
import styled from 'styled-components';
import { background } from '../../styled/mixins';
import { MaxWidthContainer } from '../../styled/utils';
import COLORS from '../../styled/colors';

const StyledHeader = styled.header`
	background-color: ${COLORS.PRIMARY};
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
