import React from 'react';
import { Link } from 'gatsby';

interface IProps {
    isLink: boolean;
    href?: string;
    children: React.ReactNode;
}

export const BlogPostTitle = ({ isLink, href, children }: IProps) => {
    if (isLink) {
        return <Link to={href}>{children}</Link>;
    } else {
        return <span>{children}</span>;
    }
};

export default BlogPostTitle;
