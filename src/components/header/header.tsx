import React, { useCallback } from 'react';
import SiteNav from '../site-nav/site-nav';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledHeader } from './style';
import { BareButton } from '../button';
import { THEMES } from '../layout/layout';
import { MdInvertColors } from 'react-icons/md';

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
    const handleButtonPressed = useCallback(() => {
        onColorChangePressed(
            activeTheme === THEMES.DEFAULT ? THEMES.NIGHT : THEMES.DEFAULT
        );
    }, [activeTheme]);

    return (
        <StyledHeader>
            <MaxWidthContainer>
                <SiteNav
                    isHome={isHome}
                    slug={slug}
                    rightSlot={
                        <BareButton onClick={handleButtonPressed}>
                            <MdInvertColors className="icon" />
                        </BareButton>
                    }
                />
            </MaxWidthContainer>
        </StyledHeader>
    );
}
