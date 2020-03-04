import * as React from 'react';
import formatDate from 'date-fns/format';
import Layout from '../Layout';
import Helmet from 'react-helmet';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledPost } from './BlogPost.style';
import HomeHeadBanner from '../HomeHeadBanner/HomeHeadBanner';

export const BlogPost = ({
    children,
    publishDate,
    title,
    seo: { canonical, pageTitle, pageDescription }
}: {
    children: any;
    publishDate: string;
    title: string;
    canonical: string;
    seo: {
        canonical: string;
        pageTitle: string;
        pageDescription: string;
    };
}) => {
    return (
        <Layout slug="blog-single">
            <Helmet>
                {canonical !== '' && <link rel="canonical" href={canonical} />}
                {pageDescription && (
                    <meta name="description" content={pageDescription} />
                )}
                <meta name="author" content="Luke Boyle" />
                <title>{pageTitle || title} | Luke Boyle</title>
            </Helmet>
            <StyledPost>
                <HomeHeadBanner hasColor>
                    <h1>{title}</h1>
                </HomeHeadBanner>
                <MaxWidthContainer className="content">
                    <p>
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
