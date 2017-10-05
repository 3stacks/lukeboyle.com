
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class publishingReactComponentsToNpm extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/8/publishing-react-components-to-npm">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Publishing React Components To Npm | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Publishing React components to npm</h1>
			</header>
		<h2>Posted on 2016-08-11 01:18:56</h2><p>Having built and published a few React components to npm, in keeping with the plug-n-play spirit of npm, I have what I believe to be a very simple implementation for both the development and installation of components. I published a boilerplate project to Git/npm and this is now my go-to whenever I need to put together an external component. <a href="https://www.npmjs.com/package/@lukeboyle/react-component-boilerplate">https://www.npmjs.com/package/@lukeboyle/react-component-boilerplate</a> The basic concept is that you have an index.jsx in a &#39;src&#39; folder. This should be transpiled to ES5 and output to the root directory called &#39;index.js&#39;. In this instance, index.js is the &quot;main&quot; in your package.json. You may notice the entry &quot;jsnext:main&quot; in the package which points to the jsx file. This convention was established by rollup (<a href="https://github.com/rollup/rollup/wiki/jsnext:main">https://github.com/rollup/rollup/wiki/jsnext:main</a>) as an entry point for ES6 modules. The idea is that when you bundle using Rollup (and the ES6 import/export syntax), your ES6 module will be used instead of the ES5 one. Given that we&#39;re still largely in the ES5 age, the rollup config generates an ES5 version (which is the main entry point) and an ES6 version in the src so you can feel free to write all the JSX goodness you please. The folder structure should roughly look like this:</p>
<pre><code>
		<span>{"."}</span><span>{"|--src"}</span><span>{"|  |--index.jsx"}</span><span>{"|--index.js"}</span><span>{"|--rollup.config.js (OR)"}</span><span>{"|--webpack.config.js"}</span><span>{"|--demo"}</span><span>{"|  |--dist"}</span><span>{"|     |--build files"}</span><span>{"|  |--src"}</span><span>{"|     |--src files"}</span>
	</code></pre><p><code>index.jsx</code></p>
<pre><code>
		<span>{"import * as React from 'react';"}</span><span>{""}</span><span>{"export default function ReactComponent(props) {"}</span><span>{"    return ("}</span><span>{"        <div>"}</span><span>{"            Job's Done"}</span><span>{"        </div>"}</span><span>{"    );"}</span><span>{"}"}</span>
	</code></pre><p>Also, to play your part in improving our package ecosystem, consider namespacing your package for npm: <a href="http://blog.npmjs.org/post/116936804365/solving-npms-hard-problem-naming-packages">http://blog.npmjs.org/post/116936804365/solving-npms-hard-problem-naming-packages</a></p>
</article>
						</div>
					);
				}
			}
		