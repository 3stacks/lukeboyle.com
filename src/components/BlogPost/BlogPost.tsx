import * as React from 'react';
import formatDate from 'date-fns/format';
import Layout from '../Layout';
import Helmet from 'react-helmet';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledPost } from './BlogPost.style';
import BlogHeader from '../BlogHeader';

export const BlogPost = ({
    isSinglePostPage,
    children,
    publishDate,
    title,
    canonical
}: {
    isSinglePostPage: boolean;
    children: any;
    publishDate: string;
    title: string;
    canonical: string;
}) => {
    return (
        <Layout slug="blog-single">
            <Helmet>
                {canonical !== '' && <link rel="canonical" href={canonical} />}
                <title>{title} | Luke Boyle</title>
            </Helmet>
            <StyledPost>
                <BlogHeader>
                    <h1>{title}</h1>
                </BlogHeader>
                <MaxWidthContainer
                    className={isSinglePostPage ? 'content' : ''}
                >
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
