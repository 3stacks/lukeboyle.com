import marked from 'marked';
import formatDate from 'date-fns/format';

export const renderer = new marked.Renderer();

renderer.list = (body, ordered, start) => {
	const tag = ordered ? 'ol' : 'ul';

	return `<${tag} ${start ? `start={${start}}` : ''}>
			${body}
		</${tag}>`;
};

renderer.link = (href, title, text) => {
	if (href.startsWith('/')) {
		return `<a href="${href}" ${
			title ? `title="${title}"` : ''
		}>${text}</a>`;
	}

	return `<a href="${href}" ${
		title ? `title="${title}"` : ''
	} target="_blank" rel="noreferrer noopener">${text}</a>`;
};

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

renderer.heading = function(code: string, level: number): string {
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

renderer.image = (href: string, title: string, text: string): string => {
	const hrefParts = href.split('/');

	console.log(hrefParts);

	return `<img src="${href}" alt="${text}" data-filename={${
		hrefParts[hrefParts.length - 1].split('.')[0]
	}}/>`;
};

export function getMarkupFromMarkdown(markdownString: string): string {
	return marked(markdownString, { renderer, gfm: true });
}
