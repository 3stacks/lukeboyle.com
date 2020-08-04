import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import Header from '../Header';
import Footer from '../Footer';
import { META_DESCRIPTION, MY_NAME, PAGES } from '../../constants';
import { GlobalLayoutStyle, StyledLayout } from './Layout.style';
import { THEMES } from '../../styled/colors';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */
html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}
body {
    margin: 0;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
main,
menu,
nav,
section,
summary {
    display: block;
}
audio,
canvas,
progress,
video {
    display: inline-block;
}
audio:not([controls]) {
    display: none;
    height: 0;
}
progress {
    vertical-align: baseline;
}
[hidden],
template {
    display: none;
}
a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
}
a:active,
a:hover {
    outline-width: 0;
}
abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
}
b,
strong {
    font-weight: inherit;
}
b,
strong {
    font-weight: bolder;
}
dfn {
    font-style: italic;
}
h1 {
    font-size: 2em;
    margin: 0.67em 0;
}
mark {
    background-color: #ff0;
    color: #000;
}
small {
    font-size: 80%;
}
sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}
sub {
    bottom: -0.25em;
}
sup {
    top: -0.5em;
}
img {
    border-style: none;
}
svg:not(:root) {
    overflow: hidden;
}
code,
kbd,
pre,
samp {
    font-family: monospace, monospace;
    font-size: 1em;
}
figure {
    margin: 1em 40px;
}
hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
}
button,
input,
select,
textarea {
    font: inherit;
    margin: 0;
}
optgroup {
    font-weight: 700;
}
button,
input {
    overflow: visible;
}
button,
select {
    text-transform: none;
}
[type='reset'],
[type='submit'],
button,
html [type='button'] {
    -webkit-appearance: button;
}
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner,
button::-moz-focus-inner {
    border-style: none;
    padding: 0;
}
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring,
button:-moz-focusring {
    outline: 1px dotted ButtonText;
}
fieldset {
    border: 1px solid silver;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
}
legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
}
textarea {
    overflow: auto;
}
[type='checkbox'],
[type='radio'] {
    box-sizing: border-box;
    padding: 0;
}
[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
    height: auto;
}
[type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
}
[type='search']::-webkit-search-cancel-button,
[type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
}
::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
}
::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
}
`;

interface IProps {
    pageName?: PAGES;
    slug: string;
    headChildren?: () => React.ReactElement;
    children: any;
}

export const Layout = ({ pageName, headChildren, slug, children }: IProps) => {
    const isHomeOrPortfolioPage =
        slug === 'home' || slug === 'portfolio' || slug === 'feed';
    const [activeTheme, updateActiveTheme] = useState<THEMES>(
        (typeof window !== 'undefined' &&
            THEMES[localStorage.getItem('activeTheme')]) ||
            THEMES.DEFAULT
    );

    useEffect(() => {
        typeof window !== 'undefined' &&
            localStorage.setItem('activeTheme', activeTheme);
    }, [activeTheme]);

    return (
        <StyledLayout
            activeTheme={activeTheme}
            className={`layout ${slug}`}
            showFullPageColor={isHomeOrPortfolioPage}
        >
            <GlobalStyles />
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
