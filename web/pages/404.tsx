import React from 'react';
import Head from 'next/head';
import MaxWidthContainer from '../components/MaxWidthContainer';
import { LinkButton } from '../components/Button';
import HomeHeadBanner from '../components/HomeHeadBanner';

export const NotFoundError = () => {
	return (
		<main className="main">
			<Head>
				<title>Not Found | Luke Boyle</title>
			</Head>
			<div className="head-slot">
				<HomeHeadBanner hasColor={false}>
					<h1 className="site-name">Not found</h1>
				</HomeHeadBanner>
			</div>
			<div className="body-slot">
				<MaxWidthContainer style={{ textAlign: 'center' }}>
					<p>
						The page you are looking for doesn&apos;t exist.
						I&apos;ll be honest, it was probably my fault.
					</p>
					<LinkButton isSecondary={false} to="/">
						Go back to Home
					</LinkButton>
				</MaxWidthContainer>
			</div>
		</main>
	);
};

export default NotFoundError;
