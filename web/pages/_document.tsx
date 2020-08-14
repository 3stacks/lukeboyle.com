import * as React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="google-site-verification"
                        content="JKQQdLNK9rQUZnixIsfEuJALcEcfPp9_ee2grLgOVGM"
                    />
                    <meta name="referrer" content="origin" />
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
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
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
