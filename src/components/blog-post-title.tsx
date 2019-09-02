import React from 'react';
import { Link } from 'gatsby';

export default function BlogPostTitle({
    isLink,
    href,
    children
}: {
    isLink: boolean;
    href?: string;
    children: React.ReactNode;
}) {
    if (isLink) {
        return <Link to={href}>{children}</Link>;
    } else {
        return <span>{children}</span>;
    }
}
