import * as React from 'react';
import { Link } from 'gatsby';
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
    publishDate: number;
    title: string;
    slug: string;
    author: string;
    children: React.ReactNode;
}) => {
    return (
        <PostPreview>
            <div>
                <h2>
                    <Link to={slug}>{title}</Link>
                </h2>
                <p>
                    Posted by {author} on the{' '}
                    <time className="date" dateTime={publishDate}>
                        {formatDate(publishDate, 'Do of MMMM, YYYY')}
                    </time>
                </p>
                <SnippetContents>{children}</SnippetContents>
                <ReadMoreLink>
                    <Link to={slug}>Read more</Link>
                </ReadMoreLink>
            </div>
        </PostPreview>
    );
};

export default BlogPreview;
