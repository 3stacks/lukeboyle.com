import glob from 'glob';
import safeGet from 'lodash/get';
import YAML from 'yamljs';
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
		const slug = path
			.split('/')
			[path.split('/').length - 1].replace('.md', '');
		const contentsWithoutFirst = rawContent.slice(3);
		const metaData = YAML.parse(
			contentsWithoutFirst.slice(0, contentsWithoutFirst.indexOf('---'))
		);

		resolve({
			slug,
			path,
			title: metaData.post_title,
			metaData,
			content: contentsWithoutFirst.slice(
				contentsWithoutFirst.indexOf('---') + 3
			)
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
	canonicalUrl: string,
	fileName: string
) {
	return `${imports}
	
export const ${componentName} = () => {
	return (
		<BlogPost
			title="${metaData.post_title}"
			fileName="${fileName.replace('.md', '')}"
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
import { BodyWrapper, MainHeader } from '../../styled/music.style';
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
	<Layout 
		slug="blog" 
		pageName={PAGES.BLOG} 
		headChildren={() => (
			<HomeHeadBanner hasColor>
				<h1 className="site-name">Boyleing Point</h1>
				<p>Psychotic ramblings about technology</p>
			</HomeHeadBanner>
		)}
	>
		<Helmet>
			<title>${
				pageNumber === 0
					? 'Blog | Luke Boyle'
					: `Page ${parseInt(key, 10) - 1} | Luke Boyle's Blog`
			}</title>
		</Helmet>
		<MaxWidthContainer>
			<BodyWrapper>
				<div className="left">
					<MainHeader>
						Post Archive
					</MainHeader>
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
>
	{${curr.snippet}}
</BlogPreview>`
						);
					}, '')}	
					<ul className="pagination">
						${
							pageNumber > 0
								? `<li><Link href="${
										key === '2'
											? '/blog'
											: `/blog/${parseInt(key, 10) - 2}`
								  }"><a>&lt;</a></Link></li>`
								: ''
						}
						${Object.entries(pages)
							.slice(1)
							.reduce((acc, curr, index) => {
								return `${acc}
<li>
	<Link href="${index === 0 ? '/blog' : `/blog/${index}`}" className=${
									pageNumber === index ? '"is-active"' : '""'
								}>
		<a>${index}</a>
	</Link>
</li>`;
							}, '')}
						${
							pageNumber !== Object.values(pages).length - 1
								? `<li><Link href="/blog/${parseInt(
										key,
										10
								  )}"><a>&gt;</a></Link></li>`
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
