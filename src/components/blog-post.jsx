import React from 'react';
import PropTypes from 'prop-types';
import formatDate from 'date-fns/format';
import BlogPostTitle from './blog-post-title.jsx';
import Helmet from 'react-helmet';

export default function BlogPost(
	{
		isSinglePostPage,
		children,
		title,
		publishDate,
		slug,
	}
) {
	const HeadingTag = isSinglePostPage ? 'h1' : 'h2';

	return (
		<div className={isSinglePostPage ? 'max-width-container blog' : ''}>
			{isSinglePostPage && (
				<Helmet>
					<title>{title} | Luke Boyle</title>
				</Helmet>
			)}
			<article className="blog-post">
				<header>
					<HeadingTag>
						<BlogPostTitle isLink={!isSinglePostPage} href={slug}>
							{title}
						</BlogPostTitle>
					</HeadingTag>
				</header>
				<p>
					<time className="post-meta__date" dateTime={publishDate}>
						{formatDate(publishDate, 'Do of MMMM, YYYY')}
					</time>
				</p>
				{children}
			</article>
		</div>
	)
}


BlogPost.defaultProps = {
	isSinglePostPage: true,
	publishDate: new Date()
};

BlogPost.propTypes = {
	isSinglePostPage: PropTypes.bool,
	publishDate: PropTypes.instanceOf(Date),
	author: PropTypes.string,
	title: PropTypes.string.isRequired
};