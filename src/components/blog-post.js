import React from 'react';
import PropTypes from 'prop-types';
import formatDate from 'date-fns/format';
import Layout from './layout';
import BlogPostTitle from './blog-post-title.js';
import BlogHeader from './blog-header';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import {bp} from '../styled/mixins';
import WIDTHS from '../styled/widths';
import {MaxWidthContainer} from "../styled/utils";

const StyledPost = styled.article`
	max-width: 100%;
	margin: 0 0 60px;
	font-size: 1.8rem;
	text-align: left;

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		text-align: center;
	}

	h3 {
		font-size: 2.4rem;
	}

	p {
		font-size: 1.8rem;
	}

	img {
		max-width: 100%;
		height: auto;
	}

	code span {
		display: block;
	}

	& .title {
		font-size: 2.8rem;
		line-height: 1.5;
		margin-top: 0;
		text-align: center;
		
		${bp(WIDTHS.M, `font-size: 3.5rem;`)}
	}
	& .meta {
		font-size: 1.4rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 50%;
		margin: 2rem auto;
		
		& .date {
			display: inline-block;
		}
		
		& .categories {
			list-style: none;
			display: inline-block;
			padding: 0;
			margin: 0;
			
			li {
				display: inline-block;
				padding: 0;
				margin: 0;
				&:not(:last-child) {
					margin-right: 15px;
				}
			}
		}
	}
	
	& .content {
		max-width: 700px;
		margin: 0 auto 2rem;
		font-size: 1.8rem;
		text-align: left;
	}
	& .tags {
		font-size: 1.4rem;
		list-style: none;
		display: inline-block;
		padding: 0;
		margin: 0;
		color: #333;
		
		li {
			display: inline-block;
			padding: 0;
			margin: 0;
			&:not(:last-child) {
				margin-right: 15px;
			}
			a {
				color: #333;
			}
		}
	}
`;

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
	const WrapperContainer = isSinglePostPage ? Layout : 'div';
	const HeaderTag = isSinglePostPage ? BlogHeader : 'div';

	return (
		<WrapperContainer slug={isSinglePostPage ? 'blog-single' : ''}>
			{isSinglePostPage && (
				<Helmet>
					{canonical !== '' && (
						<link rel="canonical" href={canonical}/>
					)}
					<title>{title} | Luke Boyle</title>
				</Helmet>
			)}
			<StyledPost>
				<HeaderTag>
					<HeadingTag>
						<BlogPostTitle isLink={!isSinglePostPage} href={slug}>
							{title}
						</BlogPostTitle>
					</HeadingTag>
				</HeaderTag>
				<MaxWidthContainer className={isSinglePostPage ? 'blog-page .content' : ''}>
					<p>
						<time className=".date" dateTime={publishDate}>
							{formatDate(publishDate, 'Do of MMMM, YYYY')}
						</time>
					</p>
					{children}
				</MaxWidthContainer>
			</StyledPost>
		</WrapperContainer>
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