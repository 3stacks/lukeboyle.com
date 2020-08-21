import * as React from 'react';
import { format } from 'date-fns';
import MaxWidthContainer from '../components/MaxWidthContainer';
import HomeHeadBanner from '../components/HomeHeadBanner';
import styled, { css } from 'styled-components';
import { blackShift, bp } from '../styled/mixins';
import Image from '../components/Image';
import { BodyWrapper } from '../styled/music.style';
import { CUSTOM_PROPERTIES } from '../styled/colors';
import Head from 'next/head';
import { initializeApollo } from '../lib/apolloClient';
import { gql } from '@apollo/client';
import { parseContentBlock } from '../utils/blog';

const Tile = styled.article`
	width: 100%;
	padding: 10px;
	${blackShift(5)};
	display: flex;
	align-items: flex-start;

	${bp(
		768,
		css`
			padding: 20px;
		`
	)}

	&:not(:last-of-type) {
		margin-bottom: 15px;
		${bp(
			768,
			css`
				margin-bottom: 30px;
			`
		)}
	}

	img {
		max-width: 100%;
	}

	table {
		font-size: 1.6rem;
		margin: 1rem 0;

		td {
			padding: 5px;
			border: 2px solid ${CUSTOM_PROPERTIES.COLOR_TEXT};
		}
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 5px 0 0 10px;

	${bp(
		768,
		css`
			padding: 5px 0 0 10px;
		`
	)}

	address {
		font-style: normal;
		display: inline;
	}

	div:first-of-type {
		font-size: 1.5rem;

		span {
			padding: 0 5px;
		}
	}

	p {
		margin: 0;
	}
`;

const PostImg = styled.div`
	margin-top: 10px;
	box-shadow: rgba(101, 119, 134, 0.2) 0 0 15px,
		rgba(101, 119, 134, 0.15) 0 0 3px 1px;
	overflow: hidden;
	display: flex;
`;

const Avatar = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;

const Post = ({
	postedDate,
	children
}: {
	postedDate: string;
	children: React.ReactNode;
}) => {
	return (
		<Tile>
			<Avatar src="/img/avatar.jpg" alt="" />
			<Body>
				<div>
					<address>Luke Boyle</address>
					<span>&middot;</span>
					<time dateTime={postedDate}>
						{format(new Date(postedDate), 'DD MMM')}
					</time>
				</div>
				<div>{children}</div>
			</Body>
		</Tile>
	);
};

/**
 * TODO: add pagination
 * TODO: don't manage content directly in the component
 */
export const Index = ({
	initialApolloState: {
		ROOT_QUERY: { feed }
	}
}: {
	initialApolloState: { ROOT_QUERY: { feed: any[] } };
}) => {
	return (
		<main className="main">
			<Head>
				<title>The Downward Spiral | Luke Boyle</title>
			</Head>
			<div className="head-slot">
				<HomeHeadBanner hasColor>
					<h1>The downward spiral</h1>
				</HomeHeadBanner>
			</div>
			<div className="body-slot">
				<MaxWidthContainer style={{ maxWidth: 768 }}>
					<BodyWrapper style={{ display: 'block' }}>
						{feed.map(post => {
							return (
								<Post postedDate={post.date} key={post.date}>
									{JSON.parse(post.body).map(
										parseContentBlock
									)}
									{post.imageSrc && (
										<PostImg>
											<Image src={post.imageSrc} alt="" />
										</PostImg>
									)}
								</Post>
							);
						})}
					</BodyWrapper>
				</MaxWidthContainer>
			</div>
		</main>
	);
};

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: gql`
			query {
				feed {
					date
					body
					imageSrc
				}
			}
		`
	});

	return {
		props: {
			initialApolloState: apolloClient.cache.extract()
		},
		revalidate: 1
	};
}

export default Index;
