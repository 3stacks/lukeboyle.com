import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { GlobalLayoutStyle } from '../styled/layout.style';
import { MY_NAME } from '../constants';

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Head>
                    <title>{MY_NAME}</title>
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
                </Head>
                <GlobalLayoutStyle />
                <Component {...pageProps} />
            </>
        );
    }
}
