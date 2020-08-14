import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../Header';
import Footer from '../Footer';
import { META_DESCRIPTION, MY_NAME, PAGES } from '../../constants';
import { GlobalLayoutStyle, StyledLayout } from './Layout.style';
import { THEMES } from '../../styled/colors';

interface IProps {
    pageName?: PAGES;
    slug: string;
    headChildren?: () => React.ReactElement;
    children: any;
}

export const Layout = ({ pageName, headChildren, slug, children }: IProps) => {
    const isHomeOrPortfolioPage =
        slug === 'home' || slug === 'portfolio' || slug === 'feed';

    return (
        <StyledLayout
            className={`layout ${slug}`}
            showFullPageColor={isHomeOrPortfolioPage}
        >
            <Head>
                <title>{MY_NAME} | Front End Developer</title>
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
                <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href="/img/apple-icon-76x76.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href="/img/apple-icon-120x120.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/img/apple-icon-152x152.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="/img/android-icon-192x192.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/img/favicon-32x32.png"
                />
                <html lang="en-US" />
            </Head>
            <GlobalLayoutStyle />
            <Header isHome={slug === 'home'} slug={slug} />
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
