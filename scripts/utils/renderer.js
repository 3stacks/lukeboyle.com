const marked = require('marked');
const formatDate = require('date-fns/format');
const getFileNameFromPath = require('@lukeboyle/get-filename-from-path');

const renderer = new marked.Renderer();

renderer.blockquote = function(htmlString) {
    return `<BlockQuote>${htmlString}</BlockQuote>`;
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

function escapeCurlies(text) {
	const textWithEscapedLeftBrace = text.split('{').join('{\'{');
	return textWithEscapedLeftBrace.split('}').join('}\'}');
}

renderer.paragraph = function(text) {
	return `<p>
		${escapeCurlies(text)}
	</p>`;
};

function getMarkupFromMarkdown(markdownString) {
	return marked(markdownString, {renderer, gfm: true});
}

module.exports = {
	getMarkupFromMarkdown,
	renderer
};
