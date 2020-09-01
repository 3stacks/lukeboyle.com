import glob from 'glob';
import fs from 'fs-extra';
import { red } from 'chalk';
import prettier from 'prettier';
import prettierConfig from '../.prettierrc.js';

(() => {
	glob('./web/out/**/*.html', (err, files) => {
		if (!files.length) {
			console.error(red('Could not find output directory'));
			process.exit(1);
		}

		const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${files
				.map(page => {
					const path = page
						.replace('./web/out', '')
						.replace('.html', '');
					const route = path === '/index' ? '/' : path;

					return `
                        <url>
                            <loc>${`https://lukeboyle.com${route}/`}</loc>
                            <changefreq>daily</changefreq>
							<priority>0.7</priority>
                        </url>
                    `;
				})
				.join('\n')}
        </urlset>
    `;

		const formatted = prettier.format(sitemap, {
			...prettierConfig,
			parser: 'html'
		});

		fs.writeFileSync('./web/out/sitemap.xml', formatted);
	});
})();
