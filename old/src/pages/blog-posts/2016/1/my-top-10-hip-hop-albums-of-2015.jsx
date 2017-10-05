
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class myTop_10HipHopAlbumsOf_2015 extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/1/my-top-10-hip-hop-albums-of-2015">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>My Top 10 Hip Hop Albums Of 2015 | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">My top 10 hip hop albums of 2015.</h1>
			</header>
		<h2>Posted on 2016-01-01 20:53:02</h2><p><strong>10. Drake - If You&#39;re Reading This Its Too Late</strong> </p>
<p><strong>9. Joey B4DA$$ - B4DA$$</strong> </p>
<p><strong>8. A$AP ROCKY - At Long Last Asap</strong> </p>
<p><strong>7. Pusha T - Darkest Before Dawn</strong> </p>
<p><strong>6. Jay Rock - 90059</strong> </p>
<p><strong>5. Death Grips - The Powers That B</strong> </p>
<p><strong>4. Dr. Dre - Compton</strong> </p>
<p><strong>3. Vince Staples - Summertime &#39;06</strong> </p>
<p><strong>2. Earl Sweatshirt - I don&#39;t like shit, I don&#39;t go outside</strong> </p>
<p><strong>1. Kendrick Lamar - To Pimp a Butterfly</strong> </p>
</article>
						</div>
					);
				}
			}
		