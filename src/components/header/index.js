import React from 'react';
import SiteNav from '../site-nav';
import styled from 'styled-components';
import {background} from '../../styled/mixins';
import {MaxWidthContainer} from '../../styled/utils';

const StyledHeader = styled.header`
	${background}
    color: white;
    width: 100%;
`;

export default function Header({isHome}) {
	return (
		<StyledHeader>
			<MaxWidthContainer>
				<SiteNav isHome={isHome}/>
			</MaxWidthContainer>
		</StyledHeader>
	);
}
