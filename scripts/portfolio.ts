import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';
import { getMarkupFromMarkdown, renderer } from './utils/renderer';
import camelCase from 'lodash/camelCase';
import shell from 'shelljs';
import getFileNameFromPath from '@lukeboyle/get-filename-from-path';

function generateComponent(acc, curr, index) {
	const fileName = getFileNameFromPath(curr.path).replace('.md', '');
	const camelCaseName = camelCase(fileName);
	let imports = `
import React from 'react';
import portfolioData from '../../data/portfolio-items';
import Helmet from 'react-helmet';
import {MaxWidthContainer, PortfolioItem} from '../../styled/utils';
import Layout from '../../components/layout/layout';
import {StyledPost} from '../../components/blog-post/style';
import {HomeHeadBanner} from '../../pages/index';
import {PORTFOLIO_ITEM_NAMES} from '../../constants';`;

	renderer.image = function(href, title, text) {
		const rawFilename = getFileNameFromPath(href);
		const imageName = `${camelCase(
			rawFilename.slice(0, rawFilename.indexOf('.'))
		)}Src`;

		imports = `${imports}\nimport ${imageName} from '.${href.replace('/portfolio-items', '')}'`;

		return `<img src={${imageName}} alt="${text}"/>`;
	};


	const rawMarkup = getMarkupFromMarkdown(curr.contents);
	const headMarkup = rawMarkup.slice(rawMarkup.indexOf('<h1 '), rawMarkup.indexOf('</h1>') + 5);
	const bodyMarkup = rawMarkup.slice(rawMarkup.indexOf('</header>') + 9);

	acc.push({
		path: curr.path,
		fileName,
		componentName: camelCaseName[0].toUpperCase() + camelCaseName.slice(1),
		component: `
			${imports}
			import {LinkButton} from '../../components/button';
				
			export default class ${camelCaseName} extends React.Component {
				render() {
				
					const portfolioContent = portfolioData.find(data => data.name === PORTFOLIO_ITEM_NAMES.${fileName
						.toUpperCase()
						.split('-')
						.join('_')});
					
					return (
						<Layout slug="portfolio" headChildren={() => (
							<HomeHeadBanner>
								${headMarkup}
							</HomeHeadBanner>
						)}>
							<Helmet>
								<title>{portfolioContent.name} | Project Case Study</title>
								<meta name="description" content={portfolioContent.snippet}/>
							</Helmet>
							<PortfolioItem>
								<MaxWidthContainer>
									<StyledPost className="content">
										${bodyMarkup}
										<div className="buttons">
											{portfolioContent.links.map(link => {
												return (
													<LinkButton
														key={link.href}
														target="_blank"
														rel="noopener noreferrer"
														className="link button primary"
														to={link.href}
													>
														{link.label}
													</LinkButton>
												);
											})}
										</div>
									</StyledPost>
								</MaxWidthContainer>
							</PortfolioItem>
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
				contents: fs.readFileSync(curr, { encoding: 'utf-8' })
			});

			return acc;
		}, []);

		shell.rm('-rf', path.resolve(`${__dirname}/../src/pages/portfolio`));

		const reversedComponents = blogPosts.reduce(generateComponent, []);

		fs.copySync(
			`${__dirname}/../portfolio-items/images`,
			`${__dirname}/../src/pages/portfolio/images`
		);
		reversedComponents.forEach(component => {
			fs.writeFileSync(
				path.resolve(
					`${__dirname}/../src/pages/portfolio/${component.fileName}.tsx`
				),
				component.component
			);
		});
	});
})();
