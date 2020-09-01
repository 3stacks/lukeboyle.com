import * as React from 'react';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import HomeHeadBanner from '../../components/HomeHeadBanner';
import Image from '../../components/Image';
import { BodyWrapper } from '../../styled/music.style';
import Head from 'next/head';
import { initializeApollo } from '../../lib/apolloClient';
import { gql } from '@apollo/client';
import { parseContentBlock } from '../../utils/blog';
import { PostImg } from '../../styled/feed.style';
import Post from '../../components/Post';

/**
 * TODO: add pagination
 */
export const Feed = ({
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

export default Feed;
