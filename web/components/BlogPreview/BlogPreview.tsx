import * as React from 'react';
import Link from 'next/link';
import formatDate from 'date-fns/format';
import { PostPreview } from './BlogPreview.style';
import styled from 'styled-components';

const SnippetContents = styled.div`
    margin: 1.6rem 0;
`;

const ReadMoreLink = styled.div`
    font-size: 1.6rem;
`;

export const BlogPreview = ({
    publishDate,
    title,
    slug,
    author,
    children
}: {
    publishDate: string;
    title: string;
    slug: string;
    author: string;
    children?: React.ReactNode;
}) => {
    return (
        <PostPreview>
            <div>
                <h2>
                    <Link href={slug}>
                        <a>{title}</a>
                    </Link>
                </h2>
                <p>
                    Posted by {author} on the{' '}
                    <time className="date" dateTime={publishDate}>
                        {formatDate(new Date(publishDate), 'Do of MMMM, YYYY')}
                    </time>
                </p>
                {children && <SnippetContents>{children}</SnippetContents>}
                <ReadMoreLink>
                    <Link href={slug}>
                        <a>Read more</a>
                    </Link>
                </ReadMoreLink>
            </div>
        </PostPreview>
    );
};

export default BlogPreview;
