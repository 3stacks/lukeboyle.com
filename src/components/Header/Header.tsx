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
                <SiteNav
                    isHome={isHome}
                    slug={slug}
                    rightSlot={
                        <>
                            <li className="item">
                                <BareButton
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: CUSTOM_PROPERTIES.COLOR_TEXT
                                    }}
                                    onClick={() =>
                                        onColorChangePressed(
                                            activeTheme === THEMES.DEFAULT
                                                ? THEMES.ALT
                                                : THEMES.DEFAULT
                                        )
                                    }
                                    title="Switch the color theme"
                                >
                                    <MdInvertColors
                                        style={{
                                            width: 25,
                                            height: 25
                                        }}
                                    />
                                </BareButton>
                            </li>
                        </>
                    }
                />
            </MaxWidthContainer>
        </StyledHeader>
    );
}
