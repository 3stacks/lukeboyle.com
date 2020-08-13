import { ApolloServer, gql } from 'apollo-server';
import fs from 'fs';
import glob from 'glob';
import { generateComponent, isNotDirectory } from './utils/blog';

function getBlogPosts() {
	return new Promise((resolve, reject) => {
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
		component: String
		title: String
		metaData: FrontMatterMetadata
		snippet: String
	}

	type Query {
		blogPosts: [BlogPost]
	}
`;

const resolvers = {
	Query: {
		blogPosts: async () => {
			return await getBlogPosts();
		}
	}
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
