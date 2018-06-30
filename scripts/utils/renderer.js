const marked = require('marked');
const renderer = new marked.Renderer();

renderer.code = function(code, language) {
	return `<pre><code>
		${code.split('\n').map(codeBlock => {
		const codeWithEscapedQuotes = codeBlock.split('"').join('\\"');
		const codeWithEscapedHashes = codeWithEscapedQuotes.split('#').join('\\#');
		return `<div>{"${codeWithEscapedHashes}"}</div>`;
	}).join('')}
	</code></pre>`;
};

module.exports = renderer;