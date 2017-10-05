
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class whyICancelledMySpotifySubscription extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/4/why-i-cancelled-my-spotify-subscription">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Why I Cancelled My Spotify Subscription | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Why I cancelled my Spotify subscription.</h1>
			</header>
		<h2>Posted on 2016-04-06 03:52:45</h2><p>I&#39;ve been a Spotify Premium subscriber since 2013, and I&#39;ve watched a gradual change from useful to straight up garbage. <strong>Adding a local file</strong> It used to be that a paired device would appear in the sidebar and you could drag local files onto it. I&#39;m not sure what the justification behind it is, but the paired devices no longer appear as accessible storage, as a compromise you can now use your devices as remote controllers. The current process to add local files to other devices is to add the local file to Spotify in your preferences, go to the local files in the sidebar (see below) <img src="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/Screen-Shot-2016-04-06-at-1.43.34-PM-300x230.png" alt="Screen Shot 2016-04-06 at 1.43.34 PM"/> Drag the files to a playlist and then make the playlist available offline on your mobile device. What&#39;s wrong with this?</p>
<ul>
<li>The local files tab DOESN&#39;T UPDATE unless you remove the folder and re-add it in preferences, or log out/log back in. This means no updates you make locally will even be detected by Spotify</li>
<li>You can&#39;t listen download offline if you don&#39;t have a premium subscription.</li>
<li>Therefore, you cannot listen to local files without paying</li>
</ul>
<p>I switched to Apple Music (this is not an endorsement, there&#39;s plenty wrong with Apple music too) The reason I chose apple is because</p>
<ul>
<li>I use an iPhone/Macbook</li>
<li>It lets you download/sync local music even without a paid subscription</li>
<li>It has a music library comparable to Spotify</li>
</ul>
</article>
						</div>
					);
				}
			}
		