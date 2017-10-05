
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class agander_1_0IsNowOut extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/4/agander-1-0-is-now-out">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Agander 1 0 Is Now Out | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Agander 1.0 is now out.</h1>
			</header>
		<h2>Posted on 2016-04-11 14:05:20</h2><p>Agander started in November 2015 with a vision to unify several of the productivity services I use. With Agander I could now have one tab where previously I had four or five. This post is fairly overdue, but I think it&#39;s worth taking the time to appreciate how far the project has come. While I did start in November, the biggest progress didn&#39;t start until January 2016. Working a 9-5 job and then coming home to work on Agander until 1AM has been a struggle, but the outcome is the true reward. As of Version 0.1 in December (with vaporware calendar) - <a href="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/Screen-Shot-2015-11-09-at-3.10.53-AM.png"><img src="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/Screen-Shot-2015-11-09-at-3.10.53-AM-1024x640.png" alt="Screen Shot 2015-11-09 at 3.10.53 AM"/></a> As of Version 1.0 on March 19th - <a href="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/Screen-Shot-2016-03-19-at-5.59.57-PM-copy.png"><img src="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/Screen-Shot-2016-03-19-at-5.59.57-PM-copy-1024x625.png" alt="Screen Shot 2016-03-19 at 5.59.57 PM copy"/></a> Agander has now entered a brief period of refactoring and optimisation, after which point, the next set of integrations will be developed to create a more comprehensive platform.</p>
</article>
						</div>
					);
				}
			}
		