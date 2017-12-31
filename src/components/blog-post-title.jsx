import React from 'react';

export default function BlogPostTitle({isLink, href, children, ...otherProps}) {
	if (isLink) {
		return (
			<a href={href}>
				{children}
			</a>
		);
	} else {
		return (
			<span>
				{children}
			</span>
		);
	}
}