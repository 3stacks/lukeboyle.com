import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';
import camelCase from 'lodash/camelCase';
import shell from 'shelljs';
import sortBy from 'lodash/sortBy';
import YAML from 'yamljs';
import marked from 'marked';
import { getMarkupFromMarkdown, renderer } from './utils/renderer';
import getFileNameFromPath from '@lukeboyle/get-filename-from-path';
import {
	generateBlogPageComponent,
	generateBlogPostComponent,
	isNotDirectory,
	resolveBlogPosts
} from './utils/blog';
import { getCanonicalURLFromString } from './utils/string';

function generateComponent(acc, curr) {
	try {
		const fileName = getFileNameFromPath(curr.path);
		const camelCaseName = camelCase(fileName);
		let postContents = curr.contents;
		let imports = `
import React from 'react';
import BlogPost from '../../../../components/BlogPost';
import BlockQuote from '../../../../components/BlockQuote';`;

		renderer.image = function(href, title, text) {
			const rawFilename = getFileNameFromPath(href);
			const imageName = `${camelCase(
				rawFilename.slice(0, rawFilename.indexOf('.'))
			)}Src`;

			imports = `${imports}\nimport ${imageName} from '${
				href.includes('http')
					? href
					: `../..${href.replace('/blog-posts', '')}`
			}'`;

			return `<img src={${imageName}} alt="${text}"/>`;
		};

		const canonicalUrl = getCanonicalURLFromString(postContents) || '';
		const contentsWithoutFirst = postContents.slice(3);
		const frontMatterMetadata = YAML.parse(
			contentsWithoutFirst.slice(0, contentsWithoutFirst.indexOf('---'))
		);

		postContents = contentsWithoutFirst.slice(
			contentsWithoutFirst.indexOf('---') + 3
		);

		const lines = postContents.trim().split('\n');
		const contentsArray = lines.map(line => {
			if (line === '') {
				return '\n';
			}

			return `${line}\n`;
		});
		const contents = {
			title: frontMatterMetadata.post_title,
			metaData: frontMatterMetadata,
			contents: contentsArray.join(''),
			snippet:
				frontMatterMetadata.post_type === 'post'
					? contentsArray
							.slice(0, 10)
							.filter(line => !line.trim().startsWith('!['))
							.join('')
					: null
		};

		if (!contents.metaData.post_status) {
			console.log('\n\nno thing here', contents.metaData);
		}

		if (contents.metaData.post_status !== 'draft') {
			let parsedContents = getMarkupFromMarkdown(contents.contents);

			if (contents.metaData.post_type === 'top_list') {
				imports = `${imports}\nimport { AlbumBlock } from '../../../../styled/music.style';`;
				const rawParts = postContents.split('<h2>');
				const parts = rawParts.slice(1, rawParts.length);
				parsedContents = parts.reduce((acc, curr) => {
					const albumTitle = curr.split('</h2>')[0];
					const artistStart = curr.split('<h3>');
					const artist = artistStart[artistStart.length - 1].split(
						'</h3>'
					)[0];
					const imageStart = curr.split('<img ');
					const imageBits = imageStart[imageStart.length - 1].split(
						'/>'
					)[0];
					const snippet = curr.split('/></p>')[1];
					return `${acc}\n<AlbumBlock>
	<h2 className="title">${albumTitle}</h2>
	<h3 className="artist">${artist}</h3>
	<img ${imageBits} />
	${
		snippet === '\n'
			? '\n'
			: `<div className="snippet">
		${curr.split('/></p>')[1]}
	</div>\n`
	}
</AlbumBlock>
`;
				}, '');
			}

			const firstParagraphToken = contents.snippet
				? marked
						.lexer(contents.snippet)
						.find(block => block.type === 'paragraph')
				: undefined;

			const snippet =
				typeof firstParagraphToken === 'undefined'
					? contents.metaData.snippet
					: getMarkupFromMarkdown((firstParagraphToken as any).text);

			acc.push({
				path: curr.path,
				fileName,
				componentName:
					camelCaseName[0].toUpperCase() + camelCaseName.slice(1),
				publishDate: new Date(contents.metaData.post_date).getTime(),
				postCategory: contents.metaData.post_category || 'blog',
				postType: contents.metaData.post_type || 'text-post',
				postAuthor: contents.metaData.post_author,
				postTitle: contents.metaData.post_title,
				snippet: snippet || null,
				component: generateBlogPostComponent(
					imports,
					camelCaseName,
					parsedContents,
					contents.metaData,
					canonicalUrl,
					fileName
				)
			});
		}

		return acc;
	} catch (e) {
		console.error('\n', curr.path, e, '\n');
	}
}

(() => {
	glob('blog-posts/**/*.md', {}, async (err, files) => {
		const blogPosts = files.filter(isNotDirectory).reduce((acc, curr) => {
			acc.push({
				path: curr,
				contents: fs.readFileSync(curr, { encoding: 'utf-8' })
			});

			return acc;
		}, []);
		const reversedComponents = blogPosts.reduce(generateComponent, []);

		const componentsSortedByDate = sortBy(
			reversedComponents,
			'publishDate'
		);
		const musicPosts = componentsSortedByDate.filter(component => {
			return component.postCategory === 'music';
		});

		shell.rm('-rf', path.resolve(`${__dirname}/../src/pages/blog-posts`));

		reversedComponents.forEach(component => {
			shell.mkdir(
				'-p',
				path.resolve(
					`${__dirname}/../src/pages/${component.path.replace(
						`/${component.fileName}`,
						''
					)}`
				)
			);
			fs.writeFileSync(
				path.resolve(
					`${__dirname}/../src/pages/${component.path.replace(
						'.md',
						'.tsx'
					)}`
				),
				component.component
			);
		});

		fs.writeFileSync(
			path.resolve(`${__dirname}/../src/data/music-posts.json`),
			JSON.stringify(
				musicPosts
					.reverse()
					.map(
						({
							postTitle,
							path,
							fileName,
							componentName,
							component,
							...others
						}) => ({
							path,
							fileName,
							componentName,
							postTitle,
							...others
						})
					),
				null,
				'\t'
			)
		);

		const sidebarData = await resolveBlogPosts();
		const components = componentsSortedByDate.reverse();
		const postsPerPage = 6;
		const pages = components.reduce((acc, curr, index) => {
			const pagesSoFar = Object.keys(acc);
			const lastPage =
				parseInt(pagesSoFar[pagesSoFar.length - 1], 10) || 0;

			if (index % postsPerPage === 0) {
				const newPage = lastPage + 1;

				return Object.assign({}, acc, {
					[newPage]: [curr]
				});
			}

			return Object.assign({}, acc, {
				[lastPage]: [...acc[lastPage], curr]
			});
		}, {});

		Object.keys(pages).forEach((key, index) => {
			const rootDir = index === 0 ? '../..' : '../..';
			const blogPage = generateBlogPageComponent(
				rootDir,
				key,
				index,
				sidebarData,
				pages
			);

			const fileName =
				index === 0
					? `${__dirname}/../src/pages/blog/index.tsx`
					: `${__dirname}/../src/pages/blog/${index}.tsx`;

			fs.copySync(
				`${__dirname}/../blog-posts/images`,
				`${__dirname}/../src/pages/blog-posts/images`
			);
			console.log(`Writing to ${fileName}`);
			fs.writeFileSync(path.resolve(fileName), blogPage);
		});
	});
})();
