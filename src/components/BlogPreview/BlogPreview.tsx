import * as React from 'react';
import { Link } from 'gatsby';
import formatDate from 'date-fns/format';
import { PostPreview } from './BlogPreview.style';

export const BlogPreview = ({
    publishDate,
    title,
    slug
}: {
    publishDate: number;
    title: string;
    slug: string;
}) => {
    return (
        <PostPreview>
            <div>
                <h2>
                    <Link to={slug}>{title}</Link>
                </h2>
                <p>
                    Posted on the{' '}
                    <time className="date" dateTime={`${publishDate}`}>
                        {formatDate(publishDate, 'Do of MMMM, YYYY')}
                    </time>
                </p>
            </div>
        </PostPreview>
    );
};

export default BlogPreview;