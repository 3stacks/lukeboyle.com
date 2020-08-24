import { ApolloServer, gql } from 'apollo-server';
import fs from 'fs';
import glob from 'glob';
import { generateComponent, isNotDirectory } from './utils/blog';
import { generatePortfolioItem } from './utils/portfolio';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import {
	getDiscogsCollectionItems,
	getTopAlbums,
	getTopArtists
} from './utils/music';
import Image from 'web/components/Image';
import { BodyWrapper } from 'web/styled/music.style';
import * as React from 'react';
import marked from 'marked';

dotenv.config();

function getBlogPosts(): Promise<any[]> {
	return new Promise(resolve => {
		glob('blog-posts/**/*.md', (err, files) => {
			resolve(
				files
					.filter(isNotDirectory)
					.map(file => {
						return {
							path: file,
							contents: fs.readFileSync(file, {
								encoding: 'utf-8'
							})
						};
					})
					.reduce(generateComponent, [])
					.reverse()
			);
		});
	});
}

function getPortfolioItems(): Promise<any[]> {
	return new Promise(resolve => {
		glob('portfolio-items/**/*.md', (err, files) => {
			resolve(
				files
					.filter(isNotDirectory)
					.map(file => {
						return {
							path: file,
							contents: fs.readFileSync(file, {
								encoding: 'utf-8'
							})
						};
					})
					.reduce(generatePortfolioItem, [])
					.reverse()
			);
		});
	});
}

async function getMusicPostPreviews() {
	const posts = await getBlogPosts();

	return posts.filter(post => post.postCategory === 'music');
}

const typeDefs = gql`
	type FrontMatterMetadata {
		post_title: String
		post_date: String
		post_modified: String
		post_status: String
		post_type: String
		post_author: String
	}

	type BlogPost {
		path: String
		slug: String
		fileName: String
		componentName: String
		publishDate: String
		postCategory: String
		postType: String
		postTitle: String
		title: String
		metaData: FrontMatterMetadata
		snippet: String
		contents: String
		contentBlocks: String
		canonicalUrl: String
	}

	type PostPreview {
		path: String
		fileName: String
		componentName: String
		postTitle: String
		publishDate: String
		postCategory: String
		postType: String
		postAuthor: String
		snippet: String
	}

	type PortfolioItem {
		path: String
		fileName: String
		componentName: String
		headMarkup: String
		bodyMarkup: String
	}

	type LFMImage {
		size: String
		link: String
	}

	type SubArtist {
		url: String
		name: String
		mbid: String
	}

	type Artist {
		artist: SubArtist
		image: [LFMImage]
		playcount: String
		url: String
		name: String
		mbid: String
	}

	type Album {
		mbid: String
		url: String
		playcount: String
		image: [LFMImage]
		name: String
		streamable: String
	}

	type DiscogsImage {
		type: String
		uri: String
		resource_url: String
		uri150: String
		width: Float
		height: Float
	}

	type DiscogsArtist {
		name: String
		anv: String
		join: String
		role: String
		tracks: String
		id: Float
		resource_url: String
		thumbnail_url: String
	}

	type DiscogsEntry {
		guid: String
		id: Float
		status: String
		year: Float
		resource_url: String
		uri: String
		artists: [DiscogsArtist]
		artists_sort: String
		format_quantity: Float
		date_added: String
		date_changed: String
		num_for_sale: Float
		lowest_price: Float
		master_id: Float
		master_url: String
		title: String
		country: String
		released: String
		notes: String
		released_formatted: String
		genres: [String]
		thumb: String
		estimated_weight: Float
		images: [DiscogsImage]
	}

	type FeedEntry {
		date: String
		body: String
		imageSrc: String
	}

	type Query {
		blogPosts: [BlogPost]
		blogPost(path: String!): BlogPost
		portfolioItems: [PortfolioItem]
		portfolioItem(path: String!): PortfolioItem
		musicPreviews: [PostPreview]
		topArtists: [Artist]
		topAlbums: [Album]
		discogsCollection: [DiscogsEntry]
		feed: [FeedEntry]
	}
`;

const resolvers = {
	Query: {
		portfolioItems: async () => {
			return await getPortfolioItems();
		},
		portfolioItem: async (_, { path }) => {
			const fileName = `.${path}.md`;
			const postFile = {
				path: fileName,
				contents: fs.readFileSync(fileName, {
					encoding: 'utf-8'
				})
			};
			const postComponent = generatePortfolioItem([], postFile);

			return postComponent[0];
		},
		blogPosts: async () => {
			return await getBlogPosts();
		},
		blogPost: async (_, { path }) => {
			const fileName = `.${path}.md`;
			const postFile = {
				path: fileName,
				contents: fs.readFileSync(fileName, {
					encoding: 'utf-8'
				})
			};
			const postComponent = generateComponent([], postFile);

			return postComponent[0];
		},
		musicPreviews: async () => {
			return await getMusicPostPreviews();
		},
		topArtists: async () => {
			const topArtistResponse = await getTopArtists(
				process.env.LAST_FM_API_KEY
			);

			return topArtistResponse.slice(0, 5).map(topArtist => {
				return {
					...topArtist,
					mbid: topArtist.mbid || nanoid(),
					image: topArtist.image.map(image => ({
						link: image['#text'],
						size: image.size
					}))
				};
			});
		},
		topAlbums: async () => {
			const topAlbumResponse = await getTopAlbums(
				process.env.LAST_FM_API_KEY
			);

			return topAlbumResponse.slice(0, 5).map(topAlbum => {
				return {
					...topAlbum,
					mbid: topAlbum.mbid || nanoid(),
					image: topAlbum.image.map(image => ({
						link: image['#text'],
						size: image.size
					}))
				};
			});
		},
		discogsCollection: async () => {
			return await getDiscogsCollectionItems(process.env.DISCOGS_TOKEN);
		},
		feed: async () => {
			const posts = [
				{
					date: '2020-08-24T23:05:00.549Z',
					body: `> "I think there's a degree of luck and intellect involved in giving up things that hurt you"
					 
[George Carlin, 40 years of comedy](https://youtu.be/nCGGWeD_EJk)`
				},
				{
					date: '2020-08-21T21:50:00.549Z',
					body: `2016 vs 2020. 2 years of powerlifting, 2 patella
dislocations, and COMPLETELY unethical mass
cultivation (GOMAD, dozen eggs a day) and I'm
finally getting some SUCCULENT deltoids. The
best gains of my life have been doing [one lift a
day](/blog-posts/2020/07/olad-results-so-far). ~75kg(165lbs) ~18% BF vs 118kg(260lbs) ~25%
BF.`,
					imageSrc: '/images/mass.jpg'
				},
				{
					date: '2020-08-21T21:49:00.549Z',
					body: `Watch it asshole
<stream src="ed8a9bee48a7e6cd988927225231d1d4" controls></stream>
<script data-cfasync="false" defer type="text/javascript" src="https://embed.videodelivery.net/embed/r4xu.fla9.latest.js?video=ed8a9bee48a7e6cd988927225231d1d4"></script>
`
				},
				{
					date: '2020-08-11T20:46:52.549Z',
					body: `Is it possible that the Australian government [banned Huawei](https://www.gizmodo.com.au/2020/03/huawei-5g-australia/) in a deliberate attempt to slow the roll-out of
the 5G? Surely they would like to recoup some of
the $48.7bn [[1]](https://www.smh.com.au/business/companies/nbn-rollout-cost-to-jump-by-2-billion-20180831-p500yw.html) they've invested into the abject failure that is
the NBN. All you need to do is look at Telstra's
official speed metrics between their supported
broadband technologies to see that NBN is a bad
service.

|     |  Peak Speed  | Latency |
| --- | ------------ | ------- |
|  4G | 100-300 Mbps | 50ms |
| 5G | 1-20 Gbps | 1-6ms |
| NBN | 12-100 Mbps | may vary |

Table data: [[2]](https://telstraventures.com/5g-australia-how-it-affects-businesses).

Expected median speed in San Francisco (under average load) market is 1.4Gbps with latency of 4.9ms [[3]](https://www.whistleout.com.au/MobilePhones/Guides/5g-in-australia-what-you-need-to-know)

<br />

If it came out that this was the case then I
wouldn't be surprised if they were also
responsible for the proliferation of 5G
conspiracy theories`
				},
				{
					date: '2020-08-04T10:32:52.549Z',
					body: `I'm going to destroy you with FACTS and LOGIC
(that's what I call my fists)`
				},
				{
					date: '2020-08-04T10:25:52.549Z',
					body: `I'm hosting my own Twitter-like feed with the
idea that it can be easily piped into an RSS
feed. It would be nice for everyone to just be
able to host their own feed and then users could
just subscribe to different people on some app.
Then everyone owns their own data (kinda like [https://matrix.org](https://matrix.org)).`
				}
			];

			return posts.map(post => ({
				...post,
				body: JSON.stringify(marked.lexer(post.body))
			}));
		}
	}
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
