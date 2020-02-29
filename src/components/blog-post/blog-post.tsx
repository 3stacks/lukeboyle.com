import * as React from 'react';
import formatDate from 'date-fns/format';
import Layout from '../layout/layout';
import BlogPostTitle from '../blog-post-title';
import Helmet from 'react-helmet';
import { MaxWidthContainer, BlogHeader } from '../../styled/utils';
import { StyledPost } from './style';

export default function BlogPost({
    isSinglePostPage,
    children,
    publishDate,
    title,
    slug,
    canonical
}: {
    isSinglePostPage: boolean;
    children: any;
    publishDate: string;
    title: string;
    slug: string;
    canonical: string;
}) {
    const HeadingTag = isSinglePostPage ? 'h1' : 'h2';
    const WrapperContainer = isSinglePostPage ? Layout : 'div';
    const HeaderTag = isSinglePostPage ? BlogHeader : 'div';

    return (
        <WrapperContainer
            isHome={false}
            slug={isSinglePostPage ? 'blog-single' : ''}
        >
            {isSinglePostPage && (
                <Helmet>
                    {canonical !== '' && (
                        <link rel="canonical" href={canonical} />
                    )}
                    <title>{title} | Luke Boyle</title>
                </Helmet>
            )}
            <StyledPost>
                <HeaderTag>
                    <HeadingTag>
                        <BlogPostTitle isLink={!isSinglePostPage} href={slug}>
                            {title}
                        </BlogPostTitle>
                        {!isSinglePostPage && (
                            <p>
                                Posted on the{' '}
                                <time className="date" dateTime={publishDate}>
                                    {formatDate(
                                        publishDate,
                                        'Do of MMMM, YYYY'
                                    )}
                                </time>
                            </p>
                        )}
                    </HeadingTag>
                </HeaderTag>
                {isSinglePostPage && (
                    <MaxWidthContainer
                        className={isSinglePostPage ? 'blog-page content' : ''}
                    >
                        <p>
                            <time className="date" dateTime={publishDate}>
                                {formatDate(publishDate, 'Do of MMMM, YYYY')}
                            </time>
                        </p>
                        <>{children}</>
                    </MaxWidthContainer>
                )}
            </StyledPost>
        </WrapperContainer>
    );
}
