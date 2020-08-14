import { getMarkupFromMarkdown, renderer } from './utils/renderer';
import camelCase from 'lodash/camelCase';
import getFileNameFromPath from '@lukeboyle/get-filename-from-path';

export function generatePortfolioItem(acc, curr) {
	const fileName = getFileNameFromPath(curr.path).replace('.md', '');
	const camelCaseName = camelCase(fileName);

	renderer.image = function(href, title, text) {
		const hrefParts = href.split('/');

		return `<img src="${href.replace(
			'/web/public',
			''
		)}" alt="${text}" data-identifier="${
			hrefParts[hrefParts.length - 1].split('.')[0]
		}" />`;
	};

	const rawMarkup = getMarkupFromMarkdown(curr.contents);
	const headMarkup = rawMarkup.slice(
		rawMarkup.indexOf('<h1 '),
		rawMarkup.indexOf('</h1>') + 5
	);
	const bodyMarkup = rawMarkup.slice(rawMarkup.indexOf('</header>') + 9);

	acc.push({
		path: curr.path,
		fileName,
		componentName: camelCaseName[0].toUpperCase() + camelCaseName.slice(1),
		headMarkup,
		bodyMarkup
	});

	return acc;
}
