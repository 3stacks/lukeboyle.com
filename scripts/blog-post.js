const glob = require('glob');
const fs = require('fs');

function generateComponent(contents) {
	return `import React from "react";
	import Helmet from "react-helmet";
	
	export default class Blog extends React.Component {
		render() {
			return (
				<div className="max-width-container">
					<Helmet>
						<title>Blog | Luke Boyle</title>
					</Helmet>
					${contents}
				</div>
			);
		}
	}`;
}

(() => {
	glob('../blog-posts/**/*.md', {}, (err, files) => {
		const posts = files.slice(Math.max(files.length - 5, 1));

		const content = posts.reduce((acc, curr) => {
			const content = fs.readFileSync(curr, {encoding: 'utf-8'});

			console.log(content.indexOf(''));

			return content.slice(content.indexOf('#'), content.indexOf('\n'));

			const something = acc + `
<article class="blog-post">
	<header>
		<h2 class="blog-post--title">
			${content.slice(content.indexOf('#'), content.indexOf('\n'))}
		</h2>
		<div class="blog-post--meta">
			<time datetime="2017-04-26 15:50:17">
				26 April 2017
			</time>
		</div>
	</header>
	<div class="blog-post--content">
	
	</div>
</article>
			`;
		}, '');

		console.log(content);
	});
})();