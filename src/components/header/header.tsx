import React from 'react';
import SiteNav from '../site-nav/site-nav';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledHeader } from './style';
import { BareButton } from '../button';
import { THEMES } from '../layout/layout';
import { MdInvertColors } from 'react-icons/md';

export default function Header({
    isHome = false,
    onColorChangePressed,
    activeTheme
}: {
    isHome: boolean;
    activeTheme: THEMES;
    onColorChangePressed: (whichColor: THEMES) => void;
}) {
    return (
        <StyledHeader>
            <MaxWidthContainer>
                <SiteNav
                    isHome={isHome}
                    rightSlot={
                        <BareButton
                            onClick={event =>
                                onColorChangePressed(
                                    activeTheme === THEMES.DEFAULT
                                        ? THEMES.NIGHT
                                        : THEMES.DEFAULT
                                )
                            }
                        >
                            <MdInvertColors className="icon" />
                        </BareButton>
                    }
                />
            </MaxWidthContainer>
        </StyledHeader>
    );
}
