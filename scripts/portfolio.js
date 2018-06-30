const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const renderer = require('./utils/renderer');
const formatDate = require('date-fns/format');
const camelCase = require('camel-case');
const titleCase = require('title-case');
const shell = require('shelljs');
const getFileNameFromPath = require('@lukeboyle/get-filename-from-path');

function getMarkupFromMarkdown(markdownString) {
	return marked(markdownString, {renderer: renderer, gfm: true});
}

function generateComponent(acc, curr, index) {
	const fileName = getFileNameFromPath(curr.path).replace('.md', '');
	const camelCaseName = camelCase(fileName);
	let imports = `import React from 'react';\nimport portfolioData from '../../data/portfolio-items';\nimport {PORTFOLIO_ITEM_NAMES} from "../../constants";`;

	renderer.image = function(href, title, text) {
		const rawFilename = getFileNameFromPath(href);
		const imageName = `${camelCase(rawFilename.slice(0, rawFilename.indexOf('.')))}Src`;

		imports = `${imports}\nimport ${imageName} from '.${href}'`;

		return `<img src={${imageName}} alt="${text}"/>`;
	};

	const bodyMarkup = getMarkupFromMarkdown(curr.contents);

	acc.push({
		path: curr.path,
		fileName,
		componentName: camelCaseName[0].toUpperCase() + camelCaseName.slice(1),
		component: `
			${imports}
				
			export default class ${camelCaseName} extends React.Component {
				render() {
					const portfolioContent = portfolioData.find(data => data.name === PORTFOLIO_ITEM_NAMES.${fileName.toUpperCase().split('-').join('_')});
				
					return (
						<div className="max-width-container">
							${bodyMarkup}
						</div>
					);
				}
			}
		`
	});

	return acc;
}

(() => {
	glob('portfolio-items/**/*.md', {}, (err, files) => {
		const blogPosts = files.reduce((acc, curr) => {
			acc.push({
				path: curr,
				contents: fs.readFileSync(curr, {encoding: 'utf-8'})
			});

			return acc;
		}, []);

		const reversedComponents = blogPosts.reduce(generateComponent, []);

		fs.copySync(`${__dirname}/../portfolio-items/images`, `${__dirname}/../src/pages/portfolio/images`);

		reversedComponents.forEach(component => {
			fs.writeFileSync(path.resolve(`${__dirname}/../src/pages/portfolio/${component.fileName}.jsx`), component.component);
		});
	});
})();