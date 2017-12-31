const glob = require('glob');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const renderer = new marked.Renderer();
const formatDate = require('date-fns/format');
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

renderer.table = function(header, body) {
	if (header.includes('Metadata name')) {
		const rows = body.split('<tr>');
		const dateRow = rows.find(row => row.includes('post_date'));
		const rawDate = dateRow.split('<td>')[2];
		const date = rawDate.slice(0, rawDate.length - 12);
		return `<p>
			<time datetime="${date}">${formatDate(date, 'Do of MMMM, YYYY')}</time>
		</p>`
	} else {
		return header + body;
	}
};

renderer.image = function(href, title, text) {
	return `<img src="${href}" alt="${text}"/>`;
};

function getMarkupFromMarkdown(markdownString) {
	return marked(markdownString, {renderer: renderer, gfm: true});
}

function generateComponent(acc, curr, index) {
	const fileName = getFileNameFromPath(curr.path);
	const camelCaseName = camelCase(fileName);
	const postContents = curr.contents;

	// TODO: use regex
	const postStatusIndex = postContents.indexOf('post_status');
	const almostPostStatus = postContents.slice(postStatusIndex + 13);
	const postStatus = almostPostStatus.slice(0, almostPostStatus.indexOf('|')).trim();

	const lines = postContents.split('\n');
	// TODO: fuck this off
	let tableMode = false;
	const contents = lines.reduce((acc, curr, index) => {
		if (curr.slice(0, 2) === '# ') {
			return Object.assign({}, acc, {
				title: curr.slice(2)
			});
		}

		// Table Start
		if (curr.includes('| Metadata name |')) {
			tableMode = true;
		}

		if (tableMode === true) {
			if (curr.slice(0, 2) === '| ') {
				const lineWithoutFirstDelimeter = curr.slice(2);
				const key = lineWithoutFirstDelimeter.slice(0, lineWithoutFirstDelimeter.indexOf(' | '));
				const value = lineWithoutFirstDelimeter.slice(lineWithoutFirstDelimeter.indexOf(' | ') + 3, -2);

				return Object.assign({}, acc, {
					metaData: Object.assign({}, acc.metaData, {
						[key]: value
					})
				});
			} else {
				tableMode = false;
			}
		}

		return Object.assign({}, acc, {
			contents: `${acc.contents || ''}\n${curr}`
		})
	}, {});

	if (postStatus !== 'draft') {
		acc.push({
			path: curr.path,
			fileName,
			componentName: camelCaseName[0].toUpperCase() + camelCaseName.slice(1),
			component: `
			import React from 'react';
			import BlogPost from '../../../../components/blog-post.jsx';
				
			export default class ${camelCaseName} extends React.Component {
				render() {
					return (
						<BlogPost
							isSinglePostPage={!this.props.isBlogPage}
							title="${contents.title}"
							publishDate="${contents.metaData['post_date']}"
							slug="/${curr.path.replace('.md', '')}"
						>
							${getMarkupFromMarkdown(contents.contents)}
						</BlogPost>
					);
				}
			}
		`
		});
	}

	return acc;
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

		const reversedComponents = blogPosts.reduce(generateComponent, []);

		shell.rm('-rf', path.resolve(`${__dirname}/../src/pages/blog-posts`));

		reversedComponents.forEach(component => {
			shell.mkdir('-p', path.resolve(`${__dirname}/../src/pages/${component.path.replace(`/${component.fileName}.md`, '')}`));
			fs.writeFileSync(path.resolve(`${__dirname}/../src/pages/${component.path.replace('.md', '.jsx')}`), component.component);
		});

		const components = reversedComponents.reverse();
		const postsPerPage = 4;
		const pages = components.reduce((acc, curr, index) => {
			const pagesSoFar = Object.keys(acc);

			const lastPage = parseInt(pagesSoFar[pagesSoFar.length - 1], 10) || 0;

			if (index % postsPerPage === 0) {
				const newPage = lastPage + 1;

				return Object.assign(
					{},
					acc,
					{
						[newPage]: [
							curr
						]
					}
				);
			}

			return Object.assign(
				{},
				acc,
				{
					[lastPage]: [
						...acc[lastPage],
						curr
					]
				}
			);
		}, {});

		Object.entries(pages).forEach(([key, value], index) => {
			const blogPage = `
			import React from 'react';
			import Helmet from 'react-helmet';
			${value.reduce((acc, curr) => {
				return acc + `import ${curr.componentName} from '${index === 0 ? './' : '../'}${curr.path.replace('.md', '.jsx')}';\n`;
			}, '')}
				
			export default class Blog extends React.Component {
				render() {
					return (
						<div>
							<Helmet>
								<title>${index === 0 ? 'Blog | Luke Boyle' : `Page ${parseInt(key, 10) - 1} | Blog`}</title>
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
								${value.reduce((acc, curr) => {
				return acc + `<${curr.componentName} isBlogPage={true}/>\n`;
			}, '')}
							</div>
							<div class="max-width-container">
								<ul className="pagination">
									${index > 0 ? `<li><a href="${key === '2' ? '/blog' : `/blog/${parseInt(key, 10) - 2}`}">Newer</a></li>` : ''}
									${index !== Object.values(pages).length - 1 ? `<li className="pagination__next"><a href="/blog/${parseInt(key, 10)}">Older</a></li>` : ''}
								</ul>
							</div>
						</div>
					);
				}
			}
		`;

			const fileName = index === 0
				? `${__dirname}/../src/pages/blog.jsx`
				: `${__dirname}/../src/pages/blog/${index}.jsx`;

			fs.writeFileSync(path.resolve(fileName), blogPage);
		});
	});
})();