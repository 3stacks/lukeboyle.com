import glob from 'glob';
import safeGet from 'lodash/get';
import * as fs from 'fs';

export function isNotDirectory(path) {
	return !fs.lstatSync(path).isDirectory();
}

export interface IContents {
	contents: string;
	title: string;
	metaData: IMetaData;
}

export interface IMetaData {
	post_title: string;
	post_date: string;
	post_author: string;
	post_modified: string;
	post_status: string;
	post_type: string;
	seoTitle: string;
	seoDescription: string;
	pageDescription: string;
}

interface IBlogPost {
	slug: string;
	path: string;
	title: string;
	content: string;
	metaData: IMetaData;
}

interface IPostArchive {
	[year: string]: {
		[month: string]: IBlogPost[];
	};
}

export function resolveBlogPost(path: string): Promise<IBlogPost> {
	return new Promise(resolve => {
		const rawContent: string = fs.readFileSync(path, {
			encoding: 'utf-8'
		});
		const lines = rawContent.split('\n');
		const slug = path
			.split('/')
			[path.split('/').length - 1].replace('.md', '');
		let title;
		let metaData;
		let contents;

		lines.forEach(line => {
			if (line.slice(0, 2) === '# ') {
				title = line.slice(2);

				return;
			}

			if (line.slice(0, 2) === '| ') {
				const lineWithoutFirstDelimeter = line.slice(2);
				const key = lineWithoutFirstDelimeter.slice(
					0,
					lineWithoutFirstDelimeter.indexOf(' | ')
				);
				const value = lineWithoutFirstDelimeter.slice(
					lineWithoutFirstDelimeter.indexOf(' | ') + 3,
					-2
				);

				metaData = {
					...metaData,
					[key.trim()]: value.trim()
				};

				return;
			}

			contents = `${contents || ''}\n${line}`;
		});

		resolve({
			slug,
			path,
			title,
			metaData,
			content: contents
		});
	});
}

export function resolveBlogPosts(): Promise<IPostArchive> {
	return new Promise(resolve => {
		glob('blog-posts/**/*.md', async (err, paths: string[]) => {
			if (err) {
				console.error(err);
			}

			const posts = paths.filter(isNotDirectory).map(resolveBlogPost);

			resolve(
				await Promise.all(posts).then(values => {
					return values.reverse().reduce((acc, post) => {
						const pathParts = post.path
							.replace('blog-posts/', '')
							.split('/');
						const year = pathParts[0];
						const month = pathParts[1];

						if (post.metaData.post_status === 'draft') {
							return acc;
						}

						return {
							...acc,
							[year]: {
								...acc[year],
								[month]: [
									...safeGet(acc, [year, month], []),
									{
										slug: post.slug,
										path: post.path,
										title: post.title
									}
								]
							}
						};
					}, {});
				})
			);
		});
	});
}

export function generateBlogPostComponent(
	imports: string,
	componentName: string,
	contents: string,
	metaData: IMetaData,
	canonicalUrl: string
) {
	return `${imports}
	
export const ${componentName} = () => {
	return (
		<BlogPost
			title="${metaData.post_title}"
			publishDate="${metaData.post_date}"
			author="${metaData.post_author}"
			canonical="${canonicalUrl}"
			seo={{
				canonical: ${canonicalUrl ? canonicalUrl : "'',"}
				pageTitle: ${metaData.seoTitle ? metaData.seoTitle : "'',"}
				pageDescription: ${metaData.seoDescription ? metaData.pageDescription : "''"}
			}}
		>
			${contents}
		</BlogPost>
	);
}

export default ${componentName};`;
}

export function generateBlogPageComponent(
	rootDir: string,
	key,
	pageNumber: number,
	sidebarData: IPostArchive,
	pages
) {
	return `import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import HomeHeadBanner from '${rootDir}/components/HomeHeadBanner';
import PostArchive from '${rootDir}/components/PostArchive';
import BlogPreview from '${rootDir}/components/BlogPreview';
import { BodyWrapper } from '../../styled/music.style';
import Layout from '${rootDir}/components/Layout';
import MaxWidthContainer from '${rootDir}/components/MaxWidthContainer';
import { PAGES } from '${rootDir}/constants';
${pages[key].reduce((acc, curr) => {
	return (
		acc +
		`import ${curr.componentName} from '${
			pageNumber === 0 ? '../' : '../'
		}${curr.path.replace('.md', '')}';\n`
	);
}, '')}
				
export const Blog = () => (
	<Layout slug="blog" pageName={PAGES.BLOG}>
		<Helmet>
			<title>${
				pageNumber === 0
					? 'Blog | Luke Boyle'
					: `Page ${parseInt(key, 10) - 1} | Luke Boyle's Blog`
			}</title>
		</Helmet>
		<HomeHeadBanner hasColor>
			<h1 className="site-name">
				Boyleing Point
			</h1>
		</HomeHeadBanner>
		<MaxWidthContainer>
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
							`
<BlogPreview 
	author="${curr.postAuthor}"
	publishDate={${curr.publishDate}} 
	title="${curr.postTitle}" 
	slug="/${curr.path.replace('.md', '')}"
/>`
						);
					}, '')}	
					<ul className="pagination">
						${
							pageNumber > 0
								? `<li><Link to="${
										key === '2'
											? '/blog'
											: `/blog/${parseInt(key, 10) - 2}`
								  }">&lt;</Link></li>`
								: ''
						}
						${Object.entries(pages)
							.slice(1)
							.reduce((acc, curr, index) => {
								return `${acc}
<li>
	<Link to="${index === 0 ? '/blog' : `/blog/${index}`}" className=${
									pageNumber === index ? '"is-active"' : '""'
								}>
		${index}
	</Link>
</li>`;
							}, '')}
						${
							pageNumber !== Object.values(pages).length - 1
								? `<li><Link to="/blog/${parseInt(
										key,
										10
								  )}">&gt;</Link></li>`
								: ''
						}
					</ul>							
				</div>
			</BodyWrapper>
		</MaxWidthContainer>
	</Layout>
)

export default Blog;`;
}
