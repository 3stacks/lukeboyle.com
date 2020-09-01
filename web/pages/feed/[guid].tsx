import * as React from 'react';
import Head from 'next/head';
import { gql } from '@apollo/client';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Image from '../../components/Image';
import { BodyWrapper } from '../../styled/music.style';
import { initializeApollo } from '../../lib/apolloClient';
import { parseContentBlock } from '../../utils/blog';
import { PostImg } from '../../styled/feed.style';
import Post from '../../components/Post';
import { AnchorButton } from '../../components/Button';
import styled, { css } from 'styled-components';
import { bp } from '../../styled/mixins';
import { WIDTHS } from '../../styled/sizes';

const PostPageMain = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1 0;

	${MaxWidthContainer} {
		${bp(
			600,
			css`
				padding-top: 30px;
				padding-bottom: 30px;
			`
		)};

		div:last-of-type {
			max-width: 700px;
		}

		${bp(
			WIDTHS.M,
			css`
				padding-top: 60px;
				padding-bottom: 60px;
			`
		)};
	}
`;

export const Feed = ({
	initialApolloState: { ROOT_QUERY }
}: {
	initialApolloState: { ROOT_QUERY: any };
}) => {
	const post: any = Object.values(ROOT_QUERY)[1];

	return (
		<PostPageMain className="main">
			<Head>
				<title>The Downward Spiral | Luke Boyle</title>
			</Head>
			<MaxWidthContainer style={{ maxWidth: 768 }}>
				<Post postedDate={post.date} guid={post.guid}>
					{JSON.parse(post.body).map(parseContentBlock)}
					{post.imageSrc && (
						<PostImg>
							<Image src={post.imageSrc} alt="" />
						</PostImg>
					)}
				</Post>
				<AnchorButton href="/feed" style={{ marginTop: 24 }}>
					Go back to feed
				</AnchorButton>
			</MaxWidthContainer>
		</PostPageMain>
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
