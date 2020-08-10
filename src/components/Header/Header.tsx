import React from 'react';
import SiteNav from '../SiteNav';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledHeader } from './Header.style';
import { THEMES } from '../../styled/colors';

export default function Header({
    isHome = false,
    slug
}: {
    isHome: boolean;
    slug: string;
    activeTheme: THEMES;
    onColorChangePressed: (whichColor: THEMES) => void;
}) {
    return (
        <StyledHeader>
            <MaxWidthContainer style={{ height: '100%' }}>
                <SiteNav isHome={isHome} slug={slug} />
            </MaxWidthContainer>
        </StyledHeader>
    );
}
