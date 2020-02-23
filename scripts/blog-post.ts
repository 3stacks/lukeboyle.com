import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';
import shell from 'shelljs';
import sortBy from 'lodash/sortBy';
import {
	generateComponent,
	isNotDirectory,
	resolveBlogPosts
} from './utils/blog';
import music from '../src/pages/music';

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
			return component.postCategory.trim() === 'music';
		});

		shell.rm('-rf', path.resolve(`${__dirname}/../src/pages/blog-posts`));

		reversedComponents.forEach(component => {
			shell.mkdir(
				'-p',
				path.resolve(
					`${__dirname}/../src/pages/${component.path.replace(
						`/${component.fileName}.md`,
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
					.map(({ postTitle, path, fileName, componentName }) => {
						console.log(fileName);

						return {
							path,
							fileName,
							componentName,
							postTitle
						};
					}),
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
			const blogPage = `import React from 'react';
import Helmet from 'react-helmet';
import {BlogHeader} from '${rootDir}/styled/utils';
import PostArchive from '${rootDir}/components/post-archive/post-archive';
import {HomeHeadBanner} from '${rootDir}/pages/index';
import {BodyWrapper} from '${rootDir}/pages/music';
import Layout from '${rootDir}/components/layout/layout';
import {MaxWidthContainer} from '${rootDir}/styled/utils';
${pages[key].reduce((acc, curr) => {
	return (
		acc +
		`import ${curr.componentName} from '${
			index === 0 ? '../' : '../'
		}${curr.path.replace('.md', '')}';\n`
	);
}, '')}
				
export default class Blog extends React.Component {
	render() {
		return (
			<Layout slug="blog">
				<Helmet>
					<title>${
						index === 0
							? 'Blog | Luke Boyle'
							: `Page ${parseInt(key, 10) - 1} | Blog`
					}</title>
				</Helmet>
				<BlogHeader>
					<h1 className="site-name">
						Boyleing Point
					</h1>
				</BlogHeader>
				<MaxWidthContainer className="blog-page">
					<BodyWrapper>
						<div className="left">
							<h3>
								Post Archive
							</h3>
							<PostArchive data={${JSON.stringify(sidebarData)}} />
						</div>
						<div>
							${pages[key].reduce((acc, curr) => {
								return (
									acc +
									`							<${curr.componentName} isBlogPage={true} />\n`
								);
							}, '')}	
							<ul className="pagination">
								${
									index > 0
										? `<li><a href="${
												key === '2'
													? '/blog'
													: `/blog/${parseInt(
															key,
															10
													  ) - 2}`
										  }">Newer</a></li>`
										: ''
								}
								${
									index !== Object.values(pages).length - 1
										? `<li className="pagination__next"><a href="/blog/${parseInt(
												key,
												10
										  )}">Older</a></li>`
										: ''
								}
							</ul>							
						</div>
					</BodyWrapper>
				</MaxWidthContainer>
			</Layout>
		);
	}
}
		`;

			const fileName =
				index === 0
					? `${__dirname}/../src/pages/blog/index.tsx`
					: `${__dirname}/../src/pages/blog/${index}.tsx`;

			fs.copySync(
				`${__dirname}/../blog-posts/images`,
				`${__dirname}/../src/pages/blog-posts/images`
			);
			fs.writeFileSync(path.resolve(fileName), blogPage);
		});
	});
})();
