const glob = require('glob');
const fs = require('fs');
const path = require('path');
const markdown = require('markdown');
const camelCase = require('camel-case');
const titleCase = require('title-case');
const shell = require('shelljs');

function getFileNameFromPath(path) {
	const pathWithoutDirectory = path.includes('/') ? path.slice(path.indexOf('/') + 1, path.length - 1) : path;
	const pathWithoutExtensions = pathWithoutDirectory.includes('.js') ? pathWithoutDirectory.slice(0, pathWithoutDirectory.indexOf('.js')) : pathWithoutDirectory;

	if (pathWithoutDirectory.includes('/')) {
		return getFileNameFromPath(pathWithoutExtensions);
	} else {
		return pathWithoutExtensions;
	}
}

function generateComponent(post) {
	const fileName = getFileNameFromPath(post.path);

	return {
		path: post.path,
		fileName,
		component: `
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class ${camelCase(fileName)} extends React.Component {
				render() {
					return (
						<div className="max-width-container">
							<Helmet>
								<title>${titleCase(fileName)} | Luke Boyle</title>
							</Helmet>
							${post.contents}
						</div>
					);
				}
			}
		`
	};
}

(() => {
	glob('blog-posts/**/*.md', {}, (err, files) => {
		const blogPosts = files.reduce((acc, curr) => {
			acc.push({
				path: curr,
				contents: fs.readFileSync(curr, {encoding: 'utf-8'})
			});

			return acc;
		}, []);

		const components = blogPosts.map(generateComponent);

		components.forEach(component => {
			console.log(component.path);
			shell.mkdir('-p', path.resolve(`${__dirname}/../src/${component.path.replace(`/${component.fileName}.md`, '')}`));
			fs.writeFileSync(path.resolve(`${__dirname}/../src/${component.path.replace('.md', '.jsx')}`), component.component);
		});
	});
})();