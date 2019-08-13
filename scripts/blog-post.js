const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const formatDate = require('date-fns/format');
const camelCase = require('camel-case');
const titleCase = require('title-case');
const shell = require('shelljs');
const marked = require('marked');
const sortBy = require('lodash/sortBy');
const renderer = new marked.Renderer();



renderer.blockquote = function(htmlString) {
	return `<BlockQuote>${htmlString}</BlockQuote>`;
};

renderer.code = function(code, language) {
	if (code.includes('{owner')) {
		console.log(code);
	}
	return `<pre><code>
		${code.split('\n').map(codeBlock => {
		const codeWithEscapedQuotes = codeBlock.split('"').join('\\"');
		const codeWithEscapedHashes = codeWithEscapedQuotes.split('#').join('\\#');
		return `<div>{"${codeWithEscapedHashes}"}</div>`;
	}).join('')}
	</code></pre>`;
};
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

function getCanonicalURLFromString(someString) {
	const canonicalUrlIndex = someString.indexOf('canonical');

	if (canonicalUrlIndex < 0) {
		return null;
	}

	const almostCanonicalUrl = someString.slice(canonicalUrlIndex + 12);

	return almostCanonicalUrl.slice(0, almostCanonicalUrl.indexOf('|')).trim() || '';
}

function generateComponent(acc, curr, index) {
	const fileName = getFileNameFromPath(curr.path);
	const camelCaseName = camelCase(fileName);
	const postContents = curr.contents;
	let imports = `
import React from 'react';
import BlogPost from '../../../../components/blog-post.js';
import BlockQuote from '../../../../components/block-quote.js';`;

	renderer.image = function(href, title, text) {
		const rawFilename = getFileNameFromPath(href);
		const imageName = `${camelCase(rawFilename.slice(0, rawFilename.indexOf('.')))}Src`;

		imports = `${imports}\nimport ${imageName} from '${href.includes('http') ? href : `../..${href}`}'`;

		return `<img src={${imageName}} alt="${text}"/>`;
	};

	// TODO: use regex
	const postStatusIndex = postContents.indexOf('post_status');
	const almostPostStatus = postContents.slice(postStatusIndex + 13);
	const postStatus = almostPostStatus.slice(0, almostPostStatus.indexOf('|')).trim();

	const canonicalUrl = getCanonicalURLFromString(postContents) || '';

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
		const postContents = getMarkupFromMarkdown(contents.contents);
		let parsedContents = postContents;

		if (contents.metaData.post_type === 'top_list') {
			imports = `${imports}\nimport AlbumBlock from '../../../../components/album-block';`;
			const rawParts = postContents.split('<h2>');
			const parts = rawParts.slice(1, rawParts.length);
			const contents = parts.reduce((acc, curr) => {
				const albumTitle = curr.split('</h2>')[0];
				const artistStart = curr.split('<h3>');
				const artist = artistStart[artistStart.length - 1].split('</h3>')[0];
				const imageStart = curr.split('<img ');
				const imageBits = imageStart[imageStart.length - 1].split('/>')[0];
				const snippet = curr.split('/></p>')[1];
				return `${acc}\n<AlbumBlock>
	<h2 className="title">${albumTitle}</h2>
	<h3 className="artist">${artist}</h3>
	<img ${imageBits} />
	${snippet === '\n' ? '\n' : `<div className="snippet">
		${curr.split('/></p>')[1]}
	</div>\n`}
</AlbumBlock>
`;
			}, '');

			parsedContents = contents;
		}

		acc.push({
			path: curr.path,
			fileName,
			componentName: camelCaseName[0].toUpperCase() + camelCaseName.slice(1),
			publishDate: new Date(contents.metaData.post_date).getTime(),
			postCategory: contents.metaData.post_category || 'blog',
			postType: contents.metaData.post_type || 'text-post',
			postTitle: contents.metaData.post_title,
			component: `
			${imports}
				
			export default class ${camelCaseName} extends React.Component {
				render() {
					return (
						<BlogPost
							isSinglePostPage={!this.props.isBlogPage}
							title="${contents.title}"
							publishDate="${contents.metaData.post_date}"
							slug="/${curr.path.replace('.md', '')}"
							canonical="${canonicalUrl}"
						>
							${parsedContents}
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
		const componentsSortedByDate = sortBy(reversedComponents, 'publishDate');
		const musicPosts = [];
		const postsWithoutMusicPosts = componentsSortedByDate.filter(component => {
			if (component.postCategory === 'music') {
				musicPosts.push(component);

				return false;
			}

			return true;
		});

		shell.rm('-rf', path.resolve(`${__dirname}/../src/pages/blog-posts`));

		reversedComponents.forEach(component => {
			shell.mkdir('-p', path.resolve(`${__dirname}/../src/pages/${component.path.replace(`/${component.fileName}.md`, '')}`));
			fs.writeFileSync(path.resolve(`${__dirname}/../src/pages/${component.path.replace('.md', '.js')}`), component.component);
		});

		fs.writeFileSync(path.resolve(`${__dirname}/../src/data/music-posts.json`), JSON.stringify(musicPosts.reverse().map(({postTitle, path, fileName, componentName}) => {
			return {
				path,
				fileName,
				componentName,
				postTitle
			};
		}), null, '\t'));

		const components = postsWithoutMusicPosts.reverse();
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

		Object.keys(pages).forEach((key, index) => {
			const rootDir = index === 0 ? '..' : '../..';
			const blogPage = `
			import React from 'react';
			import Helmet from 'react-helmet';
			import BlogHeader from '${rootDir}/components/blog-header';
			import Layout from '${rootDir}/components/layout';
			import {MaxWidthContainer} from '${rootDir}/styled/utils';
			${pages[key].reduce((acc, curr) => {
				return acc + `import ${curr.componentName} from '${index === 0 ? './' : '../'}${curr.path.replace('.md', '.js')}';\n`;
			}, '')}
				
			export default class Blog extends React.Component {
				render() {
					return (
						<Layout slug="blog">
							<Helmet>
								<title>${index === 0 ? 'Blog | Luke Boyle' : `Page ${parseInt(key, 10) - 1} | Blog`}</title>
							</Helmet>
							<BlogHeader>
								<h1 className="site-name">
									Boyleing Point
								</h1>
								<p className="description">
									7/11 was an inside job
								</p>
							</BlogHeader>
							<MaxWidthContainer className="blog-page">
								${pages[key].reduce((acc, curr) => {
				return acc + `<${curr.componentName} isBlogPage={true} />\n`;
			}, '')}
							</MaxWidthContainer>
							<MaxWidthContainer>
								<ul className="pagination">
									${index > 0 ? `<li><a href="${key === '2' ? '/blog' : `/blog/${parseInt(key, 10) - 2}`}">Newer</a></li>` : ''}
									${index !== Object.values(pages).length - 1 ? `<li className="pagination__next"><a href="/blog/${parseInt(key, 10)}">Older</a></li>` : ''}
								</ul>
							</MaxWidthContainer>
						</Layout>
					);
				}
			}
		`;

			const fileName = index === 0
				? `${__dirname}/../src/pages/blog.js`
				: `${__dirname}/../src/pages/blog/${index}.js`;

			fs.copySync(`${__dirname}/../blog-posts/images`, `${__dirname}/../src/pages/blog-posts/images`);
			fs.writeFileSync(path.resolve(fileName), blogPage);
		});
	});
})();
