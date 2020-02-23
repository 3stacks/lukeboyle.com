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
			);
		});
	});
}

const typeDefs = gql`
	type BlogPost {
		path: String
		fileName: String
		componentName: String
		publishDate: Float
		postCategory: String
		postType: String
		postTitle: String
		component: String
	}

	type Query {
		blogPosts: [BlogPost]
	}
`;

const resolvers = {
	Query: {
		blogPosts: async () => {
			const blogPosts = await getBlogPosts();

			console.log(blogPosts);
			return blogPosts;
		}
	}
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
