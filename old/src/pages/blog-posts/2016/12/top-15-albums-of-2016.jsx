
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class top_15AlbumsOf_2016 extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/12/top-15-albums-of-2016">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Top 15 Albums Of 2016 | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Top 15 Albums of 2016</h1>
			</header>
		<h2>Posted on 2016-12-14 01:48:15</h2><p>15 - The I.L.Y&#39;s - Scum With Boundaries </p>
<p>14 - Ab-Soul - Do What Thou Wilt. </p>
<p>13 - Kendrick Lamar - Untitled, Unmastered </p>
<p>12 - Open Mike Eagle - Hella Personal Film Festival </p>
<p>11 - A Tribe Called Quest - We got it from Here... Thank You 4 Your Service </p>
<p>10 - Kanye West - The Life of Pablo </p>
<p>9 - YG - Still Brazy </p>
<p>8 - Isaiah Rashad - The Sun&#39;s Tirade </p>
<p>7 - Danny Brown - Atrocity Exhibition </p>
<p>6 - NxWorries - Yes Lawd </p>
<p>5 - Death Grips - Bottomless Pit </p>
<p>4 - Flatbush Zombies - 3001: A Laced Oddysey </p>
<p>3 - ScHoolboy Q - Blank Face LP </p>
<p>2 - Frank Ocean - Blonde </p>
<p>1 - Anderson .Paak - Malibu </p>
</article>
						</div>
					);
				}
			}
		