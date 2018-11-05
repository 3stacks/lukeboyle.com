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
		canonical,
	}
) {
	const HeadingTag = isSinglePostPage ? 'h1' : 'h2';

	return (
		<div className={isSinglePostPage ? 'blog-single' : ''}>
			{isSinglePostPage && (
				<Helmet>
					{canonical !== '' && (
						<link rel="canonical" href={canonical}/>
					)}
					<title>{title} | Luke Boyle</title>
				</Helmet>
			)}
			<article className="blog-post">
				<header className={isSinglePostPage ? 'blog-header' : ''}>
					<HeadingTag>
						<BlogPostTitle isLink={!isSinglePostPage} href={slug}>
							{title}
						</BlogPostTitle>
					</HeadingTag>
				</header>
				<div className={isSinglePostPage ? 'max-width-container blog-page blog-post__content' : ''}>
					<p>
						<time className="post-meta__date" dateTime={publishDate}>
							{formatDate(publishDate, 'Do of MMMM, YYYY')}
						</time>
					</p>
					{children}
				</div>
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