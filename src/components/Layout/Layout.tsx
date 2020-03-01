import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import Header from '../Header';
import Footer from '../Footer';
import { META_DESCRIPTION, MY_NAME, PAGES } from '../../constants';
import appleSmall from '../../assets/img/apple-icon-76x76.png';
import appleMedium from '../../assets/img/apple-icon-120x120.png';
import appleLarge from '../../assets/img/apple-icon-152x152.png';
import androidIcon from '../../assets/img/android-icon-192x192.png';
import favicon from '../../assets/img/favicon-32x32.png';
import { GlobalLayoutStyle, StyledLayout } from './layout.style';
import { THEMES } from '../../styled/colors';
import './layout.css';

interface IProps {
    pageName?: PAGES;
    slug: string;
    headChildren?: () => React.ReactElement;
    children: any;
}

export const Layout = ({ pageName, headChildren, slug, children }: IProps) => {
    const isHomeOrPortfolioPage = slug === 'home' || slug === 'portfolio';
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
            showFullPageColor={isHomeOrPortfolioPage}
        >
            <Helmet title={`${MY_NAME} | Front End Developer`}>
                <meta name="description" content={META_DESCRIPTION[pageName]} />
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
                slug={slug}
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

export default Layout;
