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

	type Query {
		blogPosts: [BlogPost]
		blogPost(path: String!): BlogPost
		portfolioItems: [PortfolioItem]
		portfolioItem(path: String!): PortfolioItem
		musicPreviews: [PostPreview]
		topArtists: [Artist]
		topAlbums: [Album]
		discogsCollection: [DiscogsEntry]
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
		}
	}
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
