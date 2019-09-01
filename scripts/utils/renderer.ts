import marked from 'marked';
import formatDate from 'date-fns/format';

export const renderer = new marked.Renderer();

renderer.blockquote = function(htmlString: string): string {
	return `<BlockQuote>${htmlString}</BlockQuote>`;
};

renderer.code = function(code: string, language: string) {
	return `<pre><code>
		${code
			.split('\n')
			.map(codeBlock => {
				const codeWithEscapedQuotes = codeBlock.split('"').join('\\"');
				const codeWithEscapedHashes = codeWithEscapedQuotes
					.split('#')
					.join('\\#');
				return `<div>{"${codeWithEscapedHashes}"}</div>`;
			})
			.join('')}
	</code></pre>`;
};

renderer.heading = function(
	code: string,
	level: number,
): string {
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

renderer.table = function(header: string, body: string): string {
	if (header.includes('Metadata name')) {
		const rows = body.split('<tr>');
		const dateRow = rows.find(row => row.includes('post_date'));
		const rawDate = dateRow.split('<td>')[2];
		const date = rawDate.slice(0, rawDate.length - 12);
		return `<p>
			<time datetime="${date}">${formatDate(date, 'Do of MMMM, YYYY')}</time>
		</p>`;
	} else {
		return header + body;
	}
};

renderer.image = function(href: string, title: string, text: string): string {
	return `<img src="${href}" alt="${text}"/>`;
};

export function getMarkupFromMarkdown(markdownString: string): string {
	return marked(markdownString, { renderer, gfm: true });
}
