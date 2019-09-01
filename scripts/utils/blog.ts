import glob from 'glob';
import * as fs from 'fs';

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

export function resolveBlogPost(path :string) : Promise<IBlogPost> {
	return new Promise(resolve => {
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

		resolve({
			title,
			metaData,
			content: contents
		});
	});
}

export function resolveBlogPosts(): Promise<IBlogPost[]> {
	return new Promise((resolve, reject) => {
		glob('blog-posts/**/*.md', (err, paths: string[]) => {
			if (err) {
				console.error(err);
			}

			paths.slice(0, 1).reduce(async (acc, path) => {
				const pathParts = path.replace('blog-posts/', '').split('/');
				const year = pathParts[0];
				const month = pathParts[1];
				const slug = pathParts[2].replace('.md', '');
				const post = await resolveBlogPost(path);

				return {
					...acc,
					[year]: {
						...acc[year],
						[month]: [
							...acc[year.month],
							{
								slug,
								title: post.title
							}
						]
					}
				};
			}, {});

			const posts = paths.map((path) => resolveBlogPost(path));

			Promise.all(posts).then((values) => resolve(values))
		});
	});
}
