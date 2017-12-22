const glob = require('glob');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const renderer = new marked.Renderer();
const camelCase = require('camel-case');
const titleCase = require('title-case');
const shell = require('shelljs');
const getFileNameFromPath = require('@lukeboyle/get-filename-from-path');

renderer.heading = function(code, level) {
	if (level === 1) {
		return `
			<header>
				<h1 className="blog-post--title">${code}</h1>
			</header>
		`;
	} else {
		return `<h${level}>${code}</h${level}>`;
	}
};

renderer.code = function(code, language) {
	return `<pre><code>
		${code.split('\n').map(codeBlock => {
		const codeWithEscapedQuotes = codeBlock.split('"').join('\\"');
		const codeWithEscapedHashes = codeWithEscapedQuotes.split('#').join('\\#');
		return `<div>{"${codeWithEscapedHashes}"}</div>`;
	}).join('')}
	</code></pre>`;
};

renderer.image = function(href, title, text) {
	return `<img src="${href}" alt="${text}"/>`;
};

function getMarkupFromMarkdown(markdownString) {
	return `<article className="blog-post">${marked(markdownString, {renderer: renderer, gfm: true})}</article>`;
}

function generateComponent(post) {
	const fileName = getFileNameFromPath(post.path);
	const camelCaseName = camelCase(fileName);

	return {
		path: post.path,
		fileName,
		componentName: camelCaseName[0].toUpperCase() + camelCaseName.slice(1),
		component: `
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class ${camelCaseName} extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/${post.path.replace('.md', '')}">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							{!this.props.isBlogPage && (
								<Helmet>
									<title>${titleCase(fileName)} | Luke Boyle</title>
								</Helmet>
							)}
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

		const reversedComponents = components.reverse();

		const blogPage = `
			import React from 'react';
			import Helmet from 'react-helmet';
			${reversedComponents.reduce((acc, curr) => {
				return acc + `import ${curr.componentName} from './${curr.path.replace('.md', '.jsx')}';\n`;
			}, '')}
				
			export default class Blog extends React.Component {
				render() {
					return (
						<div>
							<Helmet>
								<title>Blog | Luke Boyle</title>
							</Helmet>
							<div className="blog-header">
								<h1 className="blog-header--site-name">
									Boyleing Point
								</h1>
								<p className="blog-header--description">
									7/11 was an inside job
								</p>
							</div>
							<div className="max-width-container blog">
								${reversedComponents.reduce((acc, curr) => {
									return acc + `<${curr.componentName} isBlogPage={true}/>\n`;
								}, '')}
							</div>
						</div>
					);
				}
			}
		`;

		fs.writeFileSync(path.resolve(`${__dirname}/../src/pages/blog.jsx`), blogPage);
	});
})();