import React from 'react';
import Helmet from 'react-helmet';
import MaxWidthContainer from '../components/MaxWidthContainer';
import Layout from '../components/Layout';
import BlogHeader from '../components/BlogHeader/BlogHeader';
import { LinkButton } from '../components/Button';

export default function NotFoundError() {
    return (
        <Layout slug="home">
            <Helmet>
                <title>Not Found | Luke Boyle</title>
            </Helmet>
            <BlogHeader>
                <h1 className="site-name">Not found</h1>
            </BlogHeader>
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
