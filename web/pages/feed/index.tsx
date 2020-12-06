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
	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			const hasBeenLoaded = Boolean(
				sessionStorage.getItem('feedLoaded') || ''
			);

			if (!hasBeenLoaded) {
				window.location.reload();
				sessionStorage.setItem('feedLoaded', 'true');
			}
		}
	}, []);

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
								<Post
									postedDate={post.date}
									key={post.guid}
									guid={post.guid}
								>
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

export const FEED_ENTRIES_QUERY = gql`
	query {
		feed {
			date
			body
			guid
			imageSrc
		}
	}
`;

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: FEED_ENTRIES_QUERY
	});

	return {
		props: {
			initialApolloState: apolloClient.cache.extract()
		},
		revalidate: 1
	};
}

export default Feed;
