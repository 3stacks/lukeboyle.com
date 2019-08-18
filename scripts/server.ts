import {gql, ApolloServer} from 'apollo-server';
import glob from 'glob';
import * as fs from 'fs';
import {getMarkupFromMarkdown} from "./utils/renderer";

const typeDefs = gql`
    type BlogPost {
        title: String
        content: String
    }

    type Query {
        blogPosts: [BlogPost]
    }
`;

interface IBlogPost {
    title: string,
    content: string
}

function resolveBlogPosts() : Promise<IBlogPost[]> {
    return new Promise((resolve, reject) => {
        glob('blog-posts/**/*.md', (err, paths : string[]) => {
            if (err) {
                console.error(err);
            }

            resolve(paths.reduce((acc : IBlogPost[], path) => {
                const rawContent : string = fs.readFileSync(path, {encoding: 'utf-8'});
                const post : IBlogPost = {
                    title: path,
                    content: rawContent
                };

                acc.push(post);

                return acc;
            }, []));
        });
    });
}

const resolvers = {
	Query: {
		blogPosts: async () => {
			const posts = await resolveBlogPosts();

			return posts;
		}
	},
};

new ApolloServer({ typeDefs, resolvers } as any).listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});