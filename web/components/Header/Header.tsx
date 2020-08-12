import React from 'react';
import SiteNav from '../SiteNav';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledHeader } from './Header.style';

export default function Header({
    isHome = false,
    slug
}: {
    isHome: boolean;
    slug: string;
}) {
    return (
        <StyledHeader>
            <MaxWidthContainer style={{ height: '100%' }}>
                <SiteNav isHome={isHome} slug={slug} />
            </MaxWidthContainer>
        </StyledHeader>
    );
}
