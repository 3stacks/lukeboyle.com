import React, { useCallback } from 'react';
import SiteNav from '../site-nav/site-nav';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledHeader } from './Header.style';
import { BareButton } from '../button';
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
    const handleButtonPressed = useCallback(() => {
        onColorChangePressed(
            activeTheme === THEMES.DEFAULT ? THEMES.ALT : THEMES.DEFAULT
        );
    }, [activeTheme]);

    return (
        <StyledHeader>
            <MaxWidthContainer>
                <SiteNav
                    isHome={isHome}
                    slug={slug}
                    rightSlot={
                        <BareButton
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: CUSTOM_PROPERTIES.COLOR_TEXT
                            }}
                            onClick={handleButtonPressed}
                        >
                            <MdInvertColors className="icon" />
                        </BareButton>
                    }
                />
            </MaxWidthContainer>
        </StyledHeader>
    );
}
