
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class agander_2_0IsNowOut extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/6/agander-2-0-is-now-out">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Agander 2 0 Is Now Out | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Agander 2.0 is now out.</h1>
			</header>
		<h2>Posted on 2016-06-07 23:21:12</h2><p>It&#39;s been about 2 and a half months since the first official full release of Agander went live, and it&#39;s out with the old in with the new.</p>
<h2>What&#39;s new?</h2><p>Outwardly, the changes are minimal. The most obvious change is that the add module dialogue is now a modal instead of a floating column element. Various styles have been optimised and reduced as much as possible so the button sizes specifically are more consistent across browsers.</p>
<h2>So why the new version?</h2><p>Around three quarters of the way through version 1 it became apparent that the app was outgrowing the constraints of the Vue system I had created, so the app has been rebuilt in React.js and Redux. <strong>The standard module model</strong> <a href="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/05/Screen-Shot-2016-05-30-at-11.43.46-PM.png"><img src="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/05/Screen-Shot-2016-05-30-at-11.43.46-PM.png" alt="Screen Shot 2016-05-30 at 11.43.46 PM"/></a> Using this model, every module has a content object and an event object under it. The content object handles calendar events, Asana workspaces and so on. Adhering to this model will allow for rapid development of new modules in future. <strong>Events</strong> The event system is simulated using the Redux middleware called Thunk. The base dispatch will set the event to executing and it will continue to execute until it is told to stop. If error is true, the event stops executing and and the error response is populated in the response key. Error false means the event resolved correctly and the response is the delicious events or tasks. React also makes rendering the correct component a breeze. I know to hide all content if the user hasn&#39;t authorised, and if the event is executing. Error messages are nice and simple too. <a href="https://youtu.be/T43RzjxwBys">https://youtu.be/T43RzjxwBys</a> <strong>Next Steps</strong> Agander is being temporarily put on hold to focus on other projects - but in its current state it is very much usable. Aside from bug fixes, there will be no new features for at least a couple months while I&#39;m working on other things. I&#39;m really happy with how far the app has come and I can finally use it for my own agenda tracking.</p>
</article>
						</div>
					);
				}
			}
		