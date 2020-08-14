import * as React from 'react';
import formatDate from 'date-fns/format';
import Head from 'next/head';
import Layout from '../Layout';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledPost } from './BlogPost.style';
import HomeHeadBanner from '../HomeHeadBanner/HomeHeadBanner';

export const BlogPost = ({
    children,
    publishDate,
    author,
    title,
    seo: { canonical, pageTitle, pageDescription },
    fileName
}: {
    children: any;
    publishDate: string;
    author: string;
    title: string;
    canonical: string;
    fileName: string;
    seo: {
        canonical: string;
        pageTitle: string;
        pageDescription: string;
    };
}) => {
    return (
        <Layout slug={`blog-single ${fileName}`}>
            <Head>
                {canonical !== '' && <link rel="canonical" href={canonical} />}
                {pageDescription && (
                    <meta name="description" content={pageDescription} />
                )}
                <meta name="author" content={author} />
                <title>{pageTitle || title} | Luke Boyle</title>
            </Head>
            <StyledPost>
                <HomeHeadBanner hasColor>
                    <h1>{title}</h1>
                </HomeHeadBanner>
                <MaxWidthContainer className="content">
                    <p>
                        Posted by {author} on the{' '}
                        <time className="date" dateTime={publishDate}>
                            {formatDate(publishDate, 'Do of MMMM, YYYY')}
                        </time>
                    </p>
                    <>{children}</>
                </MaxWidthContainer>
            </StyledPost>
        </Layout>
    );
};

export default BlogPost;
