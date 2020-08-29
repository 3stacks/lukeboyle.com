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

	if (frontMatterMetadata.post_status !== 'draft') {
		const firstParagraphToken = contents.snippet
			? marked
					.lexer(contents.snippet)
					.find(block => (block as any).type === 'paragraph')
			: undefined;

		const snippet =
			typeof firstParagraphToken === 'undefined'
				? frontMatterMetadata.snippet
				: getMarkupFromMarkdown((firstParagraphToken as any).text);

		const truePublishDate = new Date(
			frontMatterMetadata.post_date
		).toISOString();
		const pathParts = post.path.split('/');

		acc.push({
			path: post.path,
			fileName,
			slug: pathParts[pathParts.length - 1].replace('.md', ''),
			componentName:
				camelCaseName[0].toUpperCase() + camelCaseName.slice(1),
			snippet: snippet || null,
			metaData: {
				...frontMatterMetadata,
				post_date: truePublishDate,
				post_category: frontMatterMetadata.post_category || 'blog',
				post_type: frontMatterMetadata.post_type || 'text-post'
			},
			contentBlocks: JSON.stringify(marked.lexer(contents.contents)),
			canonicalUrl
		});
	}

	return acc;
}
