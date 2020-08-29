import camelCase from 'lodash/camelCase';
import getFileNameFromPath from '@lukeboyle/get-filename-from-path';
import marked from 'marked';

export function generatePortfolioItem(acc, curr) {
	const fileName = getFileNameFromPath(curr.path).replace('.md', '');
	const camelCaseName = camelCase(fileName);

	acc.push({
		path: curr.path,
		fileName,
		componentName: camelCaseName[0].toUpperCase() + camelCaseName.slice(1),
		bodyBlocks: JSON.stringify(marked.lexer(curr.contents))
	});

	return acc;
}
