import * as React from 'react';
import Head from 'next/head';
import { gql } from '@apollo/client';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import HomeHeadBanner from '../../components/HomeHeadBanner';
import Image from '../../components/Image';
import { BodyWrapper } from '../../styled/music.style';
import { initializeApollo } from '../../lib/apolloClient';
import { parseContentBlock } from '../../utils/blog';
import { PostImg } from '../../styled/feed.style';
import Post from '../../components/Post';
import Link from 'next/link';
import { LinkButton } from '../../components/Button';

/**
 * TODO: add pagination
 */
export const Feed = ({
	initialApolloState: { ROOT_QUERY }
}: {
	initialApolloState: { ROOT_QUERY: any };
}) => {
	const post: any = Object.values(ROOT_QUERY)[1];

	return (
		<main className="main">
			<Head>
				<title>The Downward Spiral | Luke Boyle</title>
			</Head>
			<MaxWidthContainer style={{ maxWidth: 768 }}>
				<BodyWrapper style={{ display: 'block' }}>
					<Post postedDate={post.date} guid={post.guid}>
						{JSON.parse(post.body).map(parseContentBlock)}
						{post.imageSrc && (
							<PostImg>
								<Image src={post.imageSrc} alt="" />
							</PostImg>
						)}
					</Post>
					<LinkButton to="/feed" style={{ marginTop: 24 }}>
						Go back to feed
					</LinkButton>
				</BodyWrapper>
			</MaxWidthContainer>
		</main>
	);
};

export async function getStaticProps({ params }) {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: gql`
			query Post($guid: String!) {
				post(guid: $guid) {
					body
					date
					guid
					imageSrc
				}
			}
		`,
		variables: {
			guid: params.guid.replace('/feed/', '')
		}
	});

	return {
		props: {
			initialApolloState: apolloClient.cache.extract()
		},
		revalidate: 1
	};
}

export async function getStaticPaths() {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: gql`
			query {
				feed {
					date
					guid
					body
					imageSrc
				}
			}
		`
	});

	const {
		ROOT_QUERY: { feed }
	} = apolloClient.cache.extract() as { ROOT_QUERY: { feed: any[] } };

	const paths = feed.map(post => {
		return `/feed/${post.guid}`;
	});

	return { paths, fallback: false };
}

export default Feed;
