import glob from 'glob';
import safeGet from 'lodash/get';
import pick from 'lodash/pick';
import * as fs from 'fs';

export function isNotDirectory(path) {
	return !fs.lstatSync(path).isDirectory();
}

interface IMetaData {
	post_title: string;
	post_date: string;
	post_modified: string;
	post_status: string;
	post_type: string;
}

interface IBlogPost {
	slug: string;
	path: string;
	title: string;
	content: string;
	metaData: IMetaData;
}

interface IPostArchive {
	[year: string]: {
		[month: string]: IBlogPost[];
	};
}

export function resolveBlogPost(path: string): Promise<IBlogPost> {
	return new Promise(resolve => {
		const rawContent: string = fs.readFileSync(path, {
			encoding: 'utf-8'
		});
		const lines = rawContent.split('\n');
		const slug = path
			.split('/')
			[path.split('/').length - 1].replace('.md', '');
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
					[key.trim()]: value.trim()
				};

				return;
			}

			contents = `${contents || ''}\n${line}`;
		});

		resolve({
			slug,
			path,
			title,
			metaData,
			content: contents
		});
	});
}

export function resolveBlogPosts(): Promise<IPostArchive> {
	return new Promise((resolve, reject) => {
		glob('blog-posts/**/*.md', async (err, paths: string[]) => {
			if (err) {
				console.error(err);
			}

			const posts = paths.filter(isNotDirectory).map(resolveBlogPost);

			resolve(
				await Promise.all(posts).then(values => {
					return values.reverse().reduce((acc, post) => {
						const pathParts = post.path
							.replace('blog-posts/', '')
							.split('/');
						const year = pathParts[0];
						const month = pathParts[1];

						if (post.metaData.post_status === 'draft') {
							return acc;
						}

						return {
							...acc,
							[year]: {
								...acc[year],
								[month]: [
									...safeGet(acc, [year, month], []),
									{
										slug: post.slug,
										path: post.path,
										title: post.title
									}
								]
							}
						};
					}, {});
				})
			);
		});
	});
}
