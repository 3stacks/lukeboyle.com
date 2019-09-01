import { gql, ApolloServer } from 'apollo-server';
import glob from 'glob';
import * as fs from 'fs';
import { getMarkupFromMarkdown } from './utils/renderer';

const typeDefs = gql`
	type BlogPost {
		title: String
		content: String
		metaData: PostMetaData
	}

	type PostMetaData {
		post_title: String
		post_date: String
		post_modified: String
		post_status: String
		post_type: String
	}

	type Query {
		blogPosts: [BlogPost]
	}
`;

interface IMetaData {
	post_title: string;
	post_date: string;
	post_modified: string;
	post_status: string;
	post_type: string;
}

interface IBlogPost {
	title: string;
	content: string;
	metaData: IMetaData;
}

function resolveBlogPosts(): Promise<IBlogPost[]> {
	return new Promise((resolve, reject) => {
		glob('blog-posts/**/*.md', (err, paths: string[]) => {
			if (err) {
				console.error(err);
			}

			resolve(
				paths.reduce((acc: IBlogPost[], path) => {
					const rawContent: string = fs.readFileSync(path, {
						encoding: 'utf-8'
					});
					const lines = rawContent.split('\n');
					let title;
					let metaData;
					let contents;

					lines.forEach(line => {
						if (line.slice(0, 2) === '# ') {
							title = line.slice(2);

							return;
						}

						if (line.slice(0, 2) === '| ') {
							const lineWithoutFirstDelimeter = line.slice(2);
							const key = lineWithoutFirstDelimeter.slice(
								0,
								lineWithoutFirstDelimeter.indexOf(' | ')
							);
							const value = lineWithoutFirstDelimeter.slice(
								lineWithoutFirstDelimeter.indexOf(' | ') + 3,
								-2
							);

							metaData = {
								...metaData,
								[key]: value.trim()
							};

							return;
						}

						contents = `${contents || ''}\n${line}`;
					});
					const post: IBlogPost = {
						title,
						metaData,
						content: contents
					};

					acc.push(post);

					return acc;
				}, [])
			);
		});
	});
}

const resolvers = {
	Query: {
		blogPosts: async () => {
			const posts = await resolveBlogPosts();

			return posts;
		}
	}
};

new ApolloServer({ typeDefs, resolvers } as any).listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
