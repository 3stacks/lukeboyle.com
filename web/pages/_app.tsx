import * as React from 'react';
import App from 'next/app';
import { Head } from 'next/document';
import { GlobalLayoutStyle } from '../styled/layout.style';

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Head />
                <GlobalLayoutStyle />
                <Component {...pageProps} />
            </>
        );
    }
}
