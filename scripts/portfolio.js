const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const renderer = require('./utils/renderer');
const camelCase = require('camel-case');
const shell = require('shelljs');
const getFileNameFromPath = require('@lukeboyle/get-filename-from-path');

function getMarkupFromMarkdown(markdownString) {
	return marked(markdownString, {renderer: renderer, gfm: true});
}

renderer.heading = function(code, level) {
	if (level === 1) {
		return `
			<header>
				<h1 className="title">${code}</h1>
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
import PortfolioItem from '../../components/portfolio-item';
import Helmet from 'react-helmet';
import {MaxWidthContainer} from '../../styled/utils';
import Layout from '../../components/layout';
import {StyledPost} from '../../components/blog-post';
import {PORTFOLIO_ITEM_NAMES} from '../../constants';`;

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
						<Layout>
							<MaxWidthContainer>
								<Helmet>
									<title>{\`\${portfolioContent.name} | Project Case Study\`}</title>
									<meta name="description" content={portfolioContent.snippet}/>
								</Helmet>
								<PortfolioItem>
									<StyledPost className="content">
										${bodyMarkup}
										<div className="buttons">
											{portfolioContent.links.map(link => {
												return (
													<a
														target="_blank"
														className="link button primary"
														href={link.href}
													>
														{link.label}
													</a>
												);
											})}
										</div>
									</StyledPost>
								</PortfolioItem>
							</MaxWidthContainer>
						</Layout>
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

		shell.rm('-rf', path.resolve(`${__dirname}/../src/pages/portfolio`));

		const reversedComponents = blogPosts.reduce(generateComponent, []);

		fs.copySync(`${__dirname}/../portfolio-items/images`, `${__dirname}/../src/pages/portfolio/images`);
		reversedComponents.forEach(component => {
			fs.writeFileSync(path.resolve(`${__dirname}/../src/pages/portfolio/${component.fileName}.jsx`), component.component);
		});
	});
})();