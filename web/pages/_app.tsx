import * as React from 'react';
import App from 'next/app';
import { GlobalLayoutStyle } from '../styled/layout.style';

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <GlobalLayoutStyle />
                <Component {...pageProps} />
            </>
        );
    }
}
