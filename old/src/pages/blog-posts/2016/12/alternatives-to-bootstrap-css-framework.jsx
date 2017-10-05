
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class alternativesToBootstrapCssFramework extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/12/alternatives-to-bootstrap-css-framework">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Alternatives To Bootstrap Css Framework | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Alternatives to Bootstrap CSS Framework</h1>
			</header>
		<h2>Posted on 2016-12-16 14:40:48</h2><p>Grid based CSS Frameworks are a dime a dozen, but are any of them actually good? Here I&#39;m presenting what I think are good alternatives to Bootstrap.</p>
<h2>Zurb Foundation</h2><h2>Bulma.io</h2><p>A robust alternative to <strong>Why it&#39;s good</strong></p>
<h2>Skeleton.css</h2><p>A super lightweight drop in framework which is great if you want to get started really quickly. <strong>Why it&#39;s good</strong> Since it targets elements instead of classes, it will instantly make your site look better, so for speedy implementation it doesn&#39;t really get better. However, beyond this, it takes a different stance on the nomenclature. Whereas in Foundation for Sites, you can use column or columns in the classes, it doesn&#39;t really make sense (because the sizing is done using large-3, small-12 etc). In Skeleton you use &#39;one column&#39; or &#39;two columns&#39;. <strong>What it&#39;s lacking</strong> Skeleton doesn&#39;t have any breakpoints out of the box so you can&#39;t size the columns with classes alone and you have to use raw media queries. <strong>Warning</strong> Skeleton is no longer maintained, so you shouldn&#39;t expect any updates or new features.</p>
</article>
						</div>
					);
				}
			}
		