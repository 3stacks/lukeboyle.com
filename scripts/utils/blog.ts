import glob from 'glob';
import safeGet from 'lodash/get';
import * as fs from 'fs';
import { getMarkupFromMarkdown, renderer } from './renderer';
import camelCase from 'lodash/camelCase';
import getFileNameFromPath from '@lukeboyle/get-filename-from-path';

function getCanonicalURLFromString(someString: string): string {
	const canonicalUrlIndex = someString.indexOf('canonical');

	if (canonicalUrlIndex < 0) {
		return null;
	}

	const almostCanonicalUrl = someString.slice(canonicalUrlIndex + 12);

	return (
		almostCanonicalUrl.slice(0, almostCanonicalUrl.indexOf('|')).trim() ||
		''
	);
}

export function generateComponent(acc, curr) {
	const fileName = getFileNameFromPath(curr.path);
	const camelCaseName = camelCase(fileName);
	const postContents = curr.contents;
	let imports = `
import React from 'react';
import BlogPost from '../../../../components/blog-post/blog-post';
import BlockQuote from '../../../../components/block-quote/block-quote';`;

	renderer.image = function(href, title, text) {
		const rawFilename = getFileNameFromPath(href);
		const imageName = `${camelCase(
			rawFilename.slice(0, rawFilename.indexOf('.'))
		)}Src`;

		imports = `${imports}\nimport ${imageName} from '${
			href.includes('http')
				? href
				: `../..${href.replace('/blog-posts', '')}`
		}'`;

		return `<img src={${imageName}} alt="${text}"/>`;
	};

	// TODO: use regex
	const postStatusIndex = postContents.indexOf('post_status');
	const almostPostStatus = postContents.slice(postStatusIndex + 13);
	const postStatus = almostPostStatus
		.slice(0, almostPostStatus.indexOf('|'))
		.replace('|', '')
		.trim();

	const canonicalUrl = getCanonicalURLFromString(postContents) || '';

	const lines = postContents.split('\n');
	// TODO: fuck this off
	let tableMode = false;
	const contents = lines.reduce((acc, curr, index) => {
		if (curr.slice(0, 2) === '# ') {
			return Object.assign({}, acc, {
				title: curr.slice(2)
			});
		}

		// Table Start
		if (curr.includes('| Metadata name |')) {
			tableMode = true;
		}

		if (tableMode === true) {
			if (curr.slice(0, 2) === '| ') {
				const lineWithoutFirstDelimeter = curr.slice(2);
				const key = lineWithoutFirstDelimeter.slice(
					0,
					lineWithoutFirstDelimeter.indexOf(' | ')
				);
				const value = lineWithoutFirstDelimeter.slice(
					lineWithoutFirstDelimeter.indexOf(' | ') + 3,
					-2
				);

				return Object.assign({}, acc, {
					metaData: Object.assign({}, acc.metaData, {
						[key]: value
					})
				});
			} else {
				tableMode = false;
			}
		}

		return Object.assign({}, acc, {
			contents: `${acc.contents || ''}\n${curr}`
		});
	}, {});
	console.log(fileName, postStatus);

	if (postStatus && postStatus !== 'draft') {
		const postContents = getMarkupFromMarkdown(contents.contents);
		let parsedContents = postContents;

		if (contents.metaData.post_type.trim() === 'top_list') {
			imports = `${imports}\nimport {AlbumBlock} from '../../../../styled/utils';`;
			const rawParts = postContents.split('<h2>');
			const parts = rawParts.slice(1, rawParts.length);
			const contents = parts.reduce((acc, curr) => {
				const albumTitle = curr.split('</h2>')[0];
				const artistStart = curr.split('<h3>');
				const artist = artistStart[artistStart.length - 1].split(
					'</h3>'
				)[0];
				const imageStart = curr.split('<img ');
				const imageBits = imageStart[imageStart.length - 1].split(
					'/>'
				)[0];
				const snippet = curr.split('/></p>')[1];
				return `${acc}\n<AlbumBlock>
	<h2 className="title">${albumTitle}</h2>
	<h3 className="artist">${artist}</h3>
	<img ${imageBits} />
	${
		snippet === '\n'
			? '\n'
			: `<div className="snippet">
		${curr.split('/></p>')[1]}
	</div>\n`
	}
</AlbumBlock>
`;
			}, '');

			parsedContents = contents;
		}

		acc.push({
			path: curr.path,
			fileName: fileName.trim(),
			componentName: (
				camelCaseName[0].toUpperCase() + camelCaseName.slice(1)
			).trim(),
			publishDate: new Date(contents.metaData.post_date).getTime(),
			postCategory: (contents.metaData.post_category || 'blog').trim(),
			postType: (contents.metaData.post_type || 'text-post').trim(),
			postTitle: contents.metaData.post_title.trim(),
			component: `
			${imports}
				
			export default class ${camelCaseName} extends React.Component {
				render() {
					return (
						<BlogPost
							isSinglePostPage={!this.props.isBlogPage}
							title="${contents.title}"
							publishDate="${contents.metaData.post_date}"
							slug="/${curr.path.replace('.md', '')}"
							canonical="${canonicalUrl}"
						>
							${parsedContents}
						</BlogPost>
					);
				}
			}
		`
		});
	}

	return acc;
}

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
					[key]: value.trim()
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
