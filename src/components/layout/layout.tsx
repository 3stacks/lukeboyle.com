import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import Header from '../header/header';
import Footer from '../footer/footer';
import { META_DESCRIPTION, MY_NAME } from '../../constants';
import appleSmall from '../../assets/img/apple-icon-76x76.png';
import appleMedium from '../../assets/img/apple-icon-120x120.png';
import appleLarge from '../../assets/img/apple-icon-152x152.png';
import androidIcon from '../../assets/img/android-icon-192x192.png';
import favicon from '../../assets/img/favicon-32x32.png';
import { GlobalLayoutStyle, StyledLayout } from './layout.style';
import './layout.css';

interface IProps {
    isHome: boolean;
    slug: string;
    headChildren?: () => React.ReactElement;
    children: React.ReactElement;
}

export enum THEMES {
    DEFAULT = 'DEFAULT',
    NIGHT = 'NIGHT',
    ALT = 'ALT'
}

export default ({ headChildren, isHome, slug, children }: IProps) => {
    const isHomeOrPortfolioPage = isHome || slug === 'portfolio';
    const [activeTheme, updateActiveTheme] = useState<THEMES>(
        (localStorage && THEMES[localStorage.getItem('activeTheme')]) ||
            THEMES.DEFAULT
    );

    useEffect(() => {
        localStorage && localStorage.setItem('activeTheme', activeTheme);
    }, [activeTheme]);

    return (
        <StyledLayout
            activeTheme={activeTheme}
            className={`layout ${slug}`}
            isHome={isHome}
            showFullPageColor={isHomeOrPortfolioPage}
        >
            <Helmet title={`${MY_NAME} | Front End Developer`}>
                <meta name="description" content={META_DESCRIPTION.HOME} />
                <meta
                    name="google-site-verification"
                    content="JKQQdLNK9rQUZnixIsfEuJALcEcfPp9_ee2grLgOVGM"
                />
                <meta name="referrer" content="origin" />
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="apple-touch-icon" sizes="76x76" href={appleSmall} />
                <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href={appleMedium}
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href={appleLarge}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href={androidIcon}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href={favicon}
                />
                <html lang="en-US" />
            </Helmet>
            <GlobalLayoutStyle />
            <Header
                isHome={slug === 'home'}
                activeTheme={activeTheme}
                onColorChangePressed={updateActiveTheme}
            />
            <main className="main">
                {headChildren && (
                    <div className="head-slot">{headChildren()}</div>
                )}
                <div className="body-slot">
                    <>{children}</>
                </div>
            </main>
            <Footer />
        </StyledLayout>
    );
};
