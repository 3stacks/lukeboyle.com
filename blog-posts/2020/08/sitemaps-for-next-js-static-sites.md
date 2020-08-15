---
post_title: Sitemaps for Next.js static sites with dynamic routes
post_date: 2020-08-15 00:00:00
post_modified: 2020-08-15 00:00:00
post_status: draft
post_type: post
post_author: Luke Boyle
snippet: I recently re-built my website in Next.js, and I needed to write a script to generate a sitemap with dynamic static routes
---

I just recently re-built my Gatsby site using Next.js. I liked Gatsby for a while,
however, I had a few issues:

-   the build process has always been dodgy for me,
-   the watch (i.e. `gatsby start`) failed after being up for a while
-   builds didn't work on Windows Linux Subsystem
-   overburdened with configuration modules

<figure>
    ![Google's lighthouse audit result shows 99 for performance, 100 for accessibility and best practices](/web/public/images/next-sitemaps/blog-page-lighthouse.jpg) 
    <figcaption>
        The Lighthouse audit results after my first round of changes
    </figcaption>
</figure>

The biggest selling point for me is the `getStaticPaths` function in the [Next.js pages](https://nextjs.org/docs/basic-features/pages#scenario-2-your-page-paths-depend-on-external-data).
Before, as a pre-build step, I was generating the entire page tree of React components using a node script. Super heavy handed, and I'm sure
there's better ways to do it in Gatsby. What I'm doing now looks like this:

```
.
└── pages
    └── blog-posts
        └── [year]
            └── [month]
                └── [title].tsx
```

The resulting output is visible in the address bar in your browser. Blog posts routes look like: `/blog-posts/2020/08/some-name`

`[title.tsx]`

```typescript jsx
export function Post() {}

export async function getStaticPaths() {
	const blogPosts = await getBlogPosts();

	const paths = blogPosts.map(
		post => `/blog-posts/${post.year}/${post.month}/${post.title}`
	);

	return { paths, fallback: false };
}
```

In the `getStaticPaths` function you return a list of new paths and Next.js automatically spits those pages out. At
build time, you can then use the path parameters to fetch external data and build your components. What this means, in
effect, is that your `/pages` folder no longer maps 1:1 to the static output. So you can't just build a sitemap off
the page directory anymore.

There's a comprehensive article on the topic by Lee Robinson ([https://leerob.io/blog/nextjs-sitemap-robots](https://leerob.io/blog/nextjs-sitemap-robots))
but this guide also assumes your source pages are 1:1 with the expected output. I adapted his script to build based off the folder output instead.

1. Download required dependencies (square brackets denote optional dependencies)

`yarn add -D glob [chalk] [prettier]`

2. Create sitemap script

```javascript
import glob from 'glob';
import fs from 'fs';
import { red } from 'chalk';
import prettier from 'prettier';
import prettierConfig from './.prettierrc.js';

(() => {
	// default next js output is `out`
	// all the pages are guaranteed to be html
	glob('./out/**/*.html', (err, files) => {
		// If there's no files in the output, a build probably hasn't been run
		if (!files.length) {
			console.error(red('Could not find output directory'));
			process.exit(1);
		}

		const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${files
				.map(page => {
					const path = page.replace('./out', '').replace('.html', '');
					const route = path === '/index' ? '/' : path;

					return `
                        <url>
                            <loc>${`https://{Your Domain Here}${route}/`}</loc>
                            <changefreq>daily</changefreq>
							<priority>0.7</priority>
                        </url>
                    `;
				})
				.join('\n')}
        </urlset>
    `;

		// Optional: you can remove this block if you aren't using prettier
		const formatted = prettier.format(sitemap, {
			...prettierConfig,
			parser: 'html'
		});

		fs.writeFileSync('./out/sitemap.xml', formatted);
	});
})();
```

3. Add script to `package.json`

```json
{
	"scripts": {
		"start": "next start",
		"build": "next build && yarn run build:sitemap",
		"build:sitemap": "node ./generate-sitemap.js"
	},
	"devDependencies": {
		"chalk": "^4.1.0",
		"fs-extra": "^6.0.1",
		"glob": "^7.1.3",
		"prettier": "^1.18.2"
	}
}
```

That's pretty much it for my implementation. You can see my sitemap
here [https://lukeboyle.com/sitemap.xml](https://lukeboyle.com/sitemap.xml).
