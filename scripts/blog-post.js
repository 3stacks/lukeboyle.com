const glob = require('glob');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const renderer = new marked.Renderer();
const camelCase = require('camel-case');
const titleCase = require('title-case');
const shell = require('shelljs');
const getFileNameFromPath = require('@lukeboyle/get-filename-from-path');

renderer.code = function(code, language) {
	console.log(code.split('\n'));
	return `<pre><code>
		${code.split('\n').map(codeBlock => {
			console.log(codeBlock);
		const codeWithEscapedQuotes = codeBlock.split('"').join('\\"');
		const codeWithEscapedHashes = codeWithEscapedQuotes.split('#').join('\\#');
		const codeWithEscapedCurlies = codeWithEscapedHashes.split('{').join('\\{').split('}').join('\\}');
		return `<span>{"${codeWithEscapedCurlies}"}</span>`;
	}).join('')}
	</code></pre>`;
};

renderer.image = function(href, title, text) {
	return `<img src="${href}" alt="${text}"/>`;
};

function getMarkupFromMarkdown(markdownString) {
	return `<div>${marked(markdownString, {renderer: renderer, gfm: true})}</div>`;
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
							${getMarkupFromMarkdown(post.contents)}
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

		shell.rm('-rf', path.resolve(`${__dirname}/../src/pages/blog-posts`));

		components.forEach(component => {
			shell.mkdir('-p', path.resolve(`${__dirname}/../src/pages/${component.path.replace(`/${component.fileName}.md`, '')}`));
			fs.writeFileSync(path.resolve(`${__dirname}/../src/pages/${component.path.replace('.md', '.jsx')}`), component.component);
		});

		glob('./src/blog-posts/**/*.jsx', {}, (err, files) => {
			console.error(err);

			const pageCount = Math.ceil(files.length / 5);
		});
	});
})();