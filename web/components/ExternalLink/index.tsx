import * as React from 'react';

export const ExternalLink = ({
	href,
	children
}: {
	href: string;
	children: any;
}) => (
	<a href={href} target="_blank" rel="noreferrer noopener">
		{children}
	</a>
);

export default ExternalLink;
