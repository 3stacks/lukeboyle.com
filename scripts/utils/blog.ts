import YAML from 'yamljs';
import * as fs from 'fs-extra';
import camelCase from 'lodash/camelCase';
import { getMarkupFromMarkdown } from './renderer';
import { getCanonicalURLFromString } from './string';
import marked from 'marked';
import getFileNameFromPath from '@lukeboyle/get-filename-from-path';

export function isNotDirectory(path) {
	return !fs.lstatSync(path).isDirectory();
}

export interface IContents {
	contents: string;
	title: string;
	metaData: IMetaData;
}

export interface IMetaData {
	post_title: string;
	post_date: string;
	post_author: string;
	post_modified: string;
	post_status: string;
	post_type: string;
	seoTitle: string;
	seoDescription: string;
	pageDescription: string;
}

interface IBlogPost {
	slug: string;
	path: string;
	title: string;
	content: string;
	metaData: IMetaData;
}

export function generateComponent(acc, post) {
	const fileName = getFileNameFromPath(post.path);
	const camelCaseName = camelCase(fileName);
	let postContents = post.contents;
	const canonicalUrl = getCanonicalURLFromString(postContents) || '';
	const contentsWithoutFirst = postContents.slice(3);
	const frontMatterMetadata = YAML.parse(
		contentsWithoutFirst.slice(0, contentsWithoutFirst.indexOf('---'))
	);

	postContents = contentsWithoutFirst.slice(
		contentsWithoutFirst.indexOf('---') + 3
	);

	const lines = postContents.trim().split('\n');
	const contentsArray = lines.map(line => {
		if (line === '') {
			return '\n';
		}

		return `${line}\n`;
	});
	const contents = {
		title: frontMatterMetadata.post_title,
		metaData: frontMatterMetadata,
		contents: contentsArray.join(''),
		snippet: frontMatterMetadata.snippet
			? frontMatterMetadata.snippet
			: frontMatterMetadata.post_type === 'post'
			? contentsArray
					.slice(0, 10)
					.filter(line => !line.trim().startsWith('!['))
					.join('')
			: null
	};

	if (contents.metaData.post_status !== 'draft') {
		let parsedContents = getMarkupFromMarkdown(contents.contents);

		if (contents.metaData.post_type === 'top_list') {
			const rawParts = postContents.split('<h2>');
			const parts = rawParts.slice(1, rawParts.length);
			parsedContents = parts.reduce((acc, curr) => {
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
				return `${acc}\n<div className=""album-block>
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
</div className="album-block">
`;
			}, '');
		}

		const firstParagraphToken = contents.snippet
			? marked
					.lexer(contents.snippet)
					.find(block => (block as any).type === 'paragraph')
			: undefined;

		const snippet =
			typeof firstParagraphToken === 'undefined'
				? contents.metaData.snippet
				: getMarkupFromMarkdown((firstParagraphToken as any).text);

		const truePublishDate = new Date(
			contents.metaData.post_date
		).toISOString();
		const pathParts = post.path.split('/');
		acc.push({
			path: post.path,
			fileName,
			slug: pathParts[pathParts.length - 1].replace('.md', ''),
			componentName:
				camelCaseName[0].toUpperCase() + camelCaseName.slice(1),
			publishDate: truePublishDate,
			postCategory: contents.metaData.post_category || 'blog',
			postType: contents.metaData.post_type || 'text-post',
			postAuthor: contents.metaData.post_author,
			postTitle: contents.metaData.post_title,
			snippet: snippet || null,
			metaData: {
				...frontMatterMetadata,
				post_date: truePublishDate
			},
			contents: parsedContents,
			canonicalUrl
		});
	}

	return acc;
}
