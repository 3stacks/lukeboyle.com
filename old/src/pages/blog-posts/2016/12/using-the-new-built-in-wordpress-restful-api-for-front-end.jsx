
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class usingTheNewBuiltInWordpressRestfulApiForFrontEnd extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/12/using-the-new-built-in-wordpress-restful-api-for-front-end">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Using The New Built In Wordpress Restful Api For Front End | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Using the new built in Wordpress RESTful API for front end</h1>
			</header>
		<h2>Posted on 2016-12-23 02:50:52</h2><p>On my portfolio page, there&#39;s a feature that will request whichever post you mouseover so that it opens that post in the current page (just to be flashy). I&#39;m using the <code>fetch</code> API, but since I could only request the url of the post I got an entire HTML document and I had to work on that to get just the content. The current system grabs that HTML and then grabs all children nodes and inserts them in a new div one by one (see below):</p>
<pre><code>
		<span>{"/**"}</span><span>{" * @param {HTMLElement} target"}</span><span>{" * @param {NodeList} nodes"}</span><span>{" * @returns {HTMLElement}"}</span><span>{" */"}</span><span>{"function fillWithNodes(target, nodes) {"}</span><span>{"    const nodeArray = Array.from(nodes);"}</span><span>{"    nodeArray.forEach((node) => {"}</span><span>{"       target.appendChild(node);"}</span><span>{"    });"}</span><span>{"    return target;"}</span><span>{"}"}</span><span>{""}</span><span>{"function parseHtml(html, containerClass) {"}</span><span>{"    const container = document.createElement('div');"}</span><span>{"    const innerContent = document.createElement('div');"}</span><span>{"    innerContent.innerHTML = html;"}</span><span>{"    container.classList.add(containerClass);"}</span><span>{"    // Fill the container with all nodes under the main tag"}</span><span>{"    const nodes = innerContent.querySelector('main').childNodes"}</span><span>{"    return fillWithNodes(container, nodes);"}</span><span>{"}"}</span>
	</code></pre><p>This action is initialised using the mouse-near package I wrote specifically for this purpose (see <a href="https://www.npmjs.com/package/@lukeboyle/mouse-near">here</a>). The reason I didn&#39;t just use hoverintent is because it did not allow for a buffer radius around the element and I wanted to prefetch the page when the mouse started approaching it.</p>
<pre><code>
		<span>{"    prefetchElements.forEach((item) => {"}</span><span>{"        mouseNear(item, () => {"}</span><span>{"            window.fetch(item.getAttribute('data-prefetch'))"}</span><span>{"                .then("}</span><span>{"                    (response) => response.text()"}</span><span>{"                ).then((text) => {"}</span><span>{"                const markup = parseHtml(text, 'portfolio-pane');"}</span><span>{"                item.querySelector('a').addEventListener('click', handleReadMoreLink.bind(this, markup));"}</span><span>{"                item.removeAttribute('data-portfolio-item');"}</span><span>{"                item.querySelector('a').setAttribute('data-portfolio-content-loaded', 'true');"}</span><span>{"            })"}</span><span>{"        }, { buffer: 80 })"}</span><span>{"    });"}</span>
	</code></pre><p>This is all a very convoluted way to just get some html on the page. If I was able to use the WP API, I would not have to:</p>
<ul>
<li>fetch an entire document just to get some content</li>
<li>process and throw away half of the document</li>
</ul>
<p>Resulting in a faster and easier interface.</p>
</article>
						</div>
					);
				}
			}
		