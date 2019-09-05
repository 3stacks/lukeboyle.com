import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { MaxWidthContainer } from '../styled/utils';

export default function NotFoundError() {
	return (
		<div>
			<Helmet>
				<title>Not Found</title>
			</Helmet>
			<MaxWidthContainer>
				<h1>Not Found</h1>
				<p>
					The page you are looking for doesn't exist. I'll be honest,
					it was probably my fault.
				</p>
				<Link to="/">Go back to Home</Link>
			</MaxWidthContainer>
		</div>
	);
}
