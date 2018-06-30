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

renderer.heading = function(code, level) {
	if (level === 1) {
		return `
			<header>
				<h1 className="single-portfolio-item__title">${code}</h1>
			</header>
		`;
	} else {
		return `<h${level}>${code}</h${level}>`;
	}
};

function generateComponent(acc, curr, index) {
	const fileName = getFileNameFromPath(curr.path).replace('.md', '');
	const camelCaseName = camelCase(fileName);
	let imports = `
import React from 'react';
import portfolioData from '../../data/portfolio-items';
import Helmet from 'react-helmet';
import {PORTFOLIO_ITEM_NAMES} from "../../constants";`;

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
							<Helmet>
								<title>{portfolioContent.name} | Project Case Study</title>
								<meta name="description" content={portfolioContent.snippet}/>
							</Helmet>
							<div className="single-portfolio-item">
								<div className="single-portfolio-item__content">
									${bodyMarkup}
									<div className="single-portfolio-item__buttons">
										{portfolioContent.links.map(link => {
											return (
												<a
													target="_blank"
													className="single-portfolio-item__link button primary"
													href={link.href}
												>
													{link.label}
												</a>
											);
										})}
									</div>
								</div>
							</div>
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