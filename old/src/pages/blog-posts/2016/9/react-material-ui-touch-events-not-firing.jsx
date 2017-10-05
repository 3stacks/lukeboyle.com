
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class reactMaterialUiTouchEventsNotFiring extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/9/react-material-ui-touch-events-not-firing">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>React Material Ui Touch Events Not Firing | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">React Material-UI touch events not firing</h1>
			</header>
		<h2>Posted on 2016-09-24 02:32:44</h2><p>After much frustration with this issue, I found this section in the react material-ui documentation - React-Tap-Event-Plugin. The custom components like the select field don&#39;t work well with the traditional onClick listener, so as a temporary fix, the react-tap-event-plugin must be included in your react project. The dependency is supposedly a temporary fix. See the repo here: <a href="https://github.com/zilverline/react-tap-event-plugin">https://github.com/zilverline/react-tap-event-plugin</a></p>
</article>
						</div>
					);
				}
			}
		