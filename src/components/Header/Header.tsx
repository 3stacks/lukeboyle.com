import React from 'react';
import SiteNav from '../SiteNav';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledHeader } from './Header.style';
import { BareButton } from '../Button';
import { MdInvertColors } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa';
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
                                        height: 25,
                                        margin: '0 10px'
                                    }}
                                />
                            </BareButton>
                            {/*<BareButton*/}
                            {/*    style={{*/}
                            {/*        display: 'flex',*/}
                            {/*        alignItems: 'center',*/}
                            {/*        justifyContent: 'center',*/}
                            {/*        color: CUSTOM_PROPERTIES.COLOR_TEXT*/}
                            {/*    }}*/}
                            {/*    onClick={() =>*/}
                            {/*        onColorChangePressed(*/}
                            {/*            activeTheme === THEMES.NIGHT*/}
                            {/*                ? THEMES.DEFAULT*/}
                            {/*                : THEMES.NIGHT*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*    title={*/}
                            {/*        activeTheme === THEMES.NIGHT*/}
                            {/*            ? 'Switch to light mode'*/}
                            {/*            : 'Switch to night mode'*/}
                            {/*    }*/}
                            {/*>*/}
                            {/*    <FaMoon style={{ width: 20, height: 20 }} />*/}
                            {/*</BareButton>*/}
                        </>
                    }
                />
            </MaxWidthContainer>
        </StyledHeader>
    );
}
