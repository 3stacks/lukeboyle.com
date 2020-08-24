import * as React from 'react';
import Head from 'next/head';
import { MY_NAME } from '../constants';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import { GlobalLayoutStyle } from '../styled/layout.style';

export const MyApp = ({ Component, pageProps }) => {
	return (
		<Layout>
			<Head>
				<title>{MY_NAME}</title>
				<meta name="referrer" content="origin" />
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="/apple-icon-76x76.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="/apple-icon-120x120.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/apple-icon-152x152.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/android-icon-192x192.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="shortcut icon"
					href="/favicon.ico"
					type="image/x-icon"
				/>
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					name="google-site-verification"
					content="JKQQdLNK9rQUZnixIsfEuJALcEcfPp9_ee2grLgOVGM"
				/>
			</Head>
			<GlobalLayoutStyle />
			<Component {...pageProps} />
		</Layout>
	);
};

export default MyApp;
