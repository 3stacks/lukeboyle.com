import React from 'react';
import Head from 'next/head';
import MaxWidthContainer from '../components/MaxWidthContainer';
import Layout from '../components/Layout';
import { LinkButton } from '../components/Button';
import HomeHeadBanner from '../components/HomeHeadBanner/HomeHeadBanner';

export default function NotFoundError() {
    return (
        <Layout slug="home">
            <Head>
                <title>Not Found | Luke Boyle</title>
            </Head>
            <HomeHeadBanner hasColor={false}>
                <h1 className="site-name">Not found</h1>
            </HomeHeadBanner>
            <MaxWidthContainer style={{ textAlign: 'center' }}>
                <p>
                    The page you are looking for doesn&apos;t exist. I&apos;ll
                    be honest, it was probably my fault.
                </p>
                <LinkButton isSecondary={false} to="/">
                    Go back to Home
                </LinkButton>
            </MaxWidthContainer>
        </Layout>
    );
}
