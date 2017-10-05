
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class localStorageManagerVersion_2_1IsOutNow extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/10/local-storage-manager-version-2-1-is-out-now">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Local Storage Manager Version 2 1 Is Out Now | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Local Storage Manager version 2.1 is out now</h1>
			</header>
		<h2>Posted on 2016-10-19 04:47:24</h2><p>The latest version of local-storage-manager has had the internal interface greatly improved for tidiness and best practice, and now has the new Namespace feature. Traditionally, you would have to store your data like so:</p>
<pre><code>
		<span>{"const appState = {"}</span><span>{"    key1: {...},"}</span><span>{"    key2: {...}"}</span><span>{"}"}</span>
	</code></pre><p>and set the data like this:</p>
<pre><code>
		<span>{"localStorageManager.set('appData', appState);"}</span>
	</code></pre><p>The issue with this is you may not want <code>key1</code> and <code>key2</code> to be grouped together but don&#39;t want them to be tossed straight into the local storage. With namespaces you can do this:</p>
<pre><code>
		<span>{"localStorageManager.set('key1', key1, 'myAppState');"}</span><span>{"localStorageManager.set('key2', key2, 'myAppState');"}</span>
	</code></pre><p>This makes it easier to access all of your data at once while still keeping those keys theoretically separate. When accessing the namespaced data, you simply add the namespace as the second arg like so:</p>
<pre><code>
		<span>{"localStorageManager.get('key1', 'myAppState');"}</span>
	</code></pre><p>The app is now more robust internally and can handle cases of missing data better. It also uses the <code>getItem</code> and <code>setItem</code> methods internally instead of accessing the localStorage directly. To get started, install via npm with <code>npm install @lukeboyle/local-storage-manager</code> See the npm page with documentation and in depth instructions at - <a href="https://www.npmjs.com/package/@lukeboyle/local-storage-manager">https://www.npmjs.com/package/@lukeboyle/local-storage-manager</a></p>
</article>
						</div>
					);
				}
			}
		