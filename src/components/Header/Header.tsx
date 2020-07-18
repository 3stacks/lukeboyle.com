import React from 'react';
import SiteNav from '../SiteNav';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledHeader } from './Header.style';
import { BareButton } from '../Button';
import { MdInvertColors } from 'react-icons/md';
import { CUSTOM_PROPERTIES, THEMES } from '../../styled/colors';

export default function Header({
    isHome = false,
    slug,
    onColorChangePressed,
    activeTheme
}: {
    isHome: boolean;
    slug: string;
    activeTheme: THEMES;
    onColorChangePressed: (whichColor: THEMES) => void;
}) {
    return (
        <StyledHeader>
            <MaxWidthContainer>
                <SiteNav isHome={isHome} slug={slug} />
            </MaxWidthContainer>
        </StyledHeader>
    );
}
