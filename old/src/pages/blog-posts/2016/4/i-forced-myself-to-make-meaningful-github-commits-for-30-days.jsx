
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class iForcedMyselfToMakeMeaningfulGithubCommitsFor_30Days extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/4/i-forced-myself-to-make-meaningful-github-commits-for-30-days">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>I Forced Myself To Make Meaningful Github Commits For 30 Days | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">I forced myself to make meaningful Github commits for 30 days.</h1>
			</header>
		<h2>Posted on 2016-04-25 01:40:28</h2><p>30 days ago I decided to see how long I could keep up a streak on Github, but I didn&#39;t want to half ass it. 1 commit days just would not do. I quickly found that if I was going to be successful I would need to make a conscious effort to reserve time and energy each day. So my typical day became:</p>
<table>

<thead>

<tr>

<td>Ride tram</td>

<td>Work</td>

<td>Lunch</td>

<td>Tram home</td>

<td>Get home</td>

</tr>

</thead>

<tbody>

<tr>

<td>Github Work</td>

<td>Do my real job</td>

<td>Smash a sandwich and do Github work</td>

<td>Github Work</td>

<td>Github Work and human functions</td>

</tr>

</tbody>

</table>

<p>Between all that there hasn&#39;t been much room to have a life. But when I look at where I was 30 days ago, I had just published Agander 1.0 and didn&#39;t have much else going on. So, I needed stuff to work on.</p>
<h2>Portfolio</h2><p>First I looked to my portfolio site, which was in desperate need of an overhaul. <a href="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/Screen-Shot-2016-04-25-at-10.54.45-AM.png"><img src="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/Screen-Shot-2016-04-25-at-10.54.45-AM-1024x556.png" alt="Screen Shot 2016-04-25 at 10.54.45 AM"/></a> It was a column/row layout that you could traverse using keyboard controls or swipe. Pretty ordinary. As usual, I threw myself in the deep end without any proper planning and started plugging away, and eventually I decided that I needed to do away with the rows. If each slide is a scrollable canvas the content can be much more fleshed out. So the idea became that each slide was inlined and their position would be translated depending on which slide you have selected. <a href="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/portfolio-1.png"><img src="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/portfolio-1-1024x576.png" alt="portfolio 1"/></a> The tricky part was that when you scrolled down and pressed next, you would be in the middle of the slide. So I needed to figure out how to make it fixed while it was off-screen. <a href="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/portfolio-2.png"><img src="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/portfolio-2-1024x576.png" alt="portfolio 2"/></a> With this system, when you hit next, you&#39;ll be at the top of the next slide. I&#39;m hoping to figure out a more user friendly way of generating the slides and then I&#39;ll package it up and release it as a site plugin. The slide classes are applied using JavaScript so it has a nice no-js fallback where all the slides just stack naturally and you can scroll down. Next step will be to add little thumbnails to signify the slides and then force IE into no-js mode because it doesn&#39;t support this tech. This is live here: <a href="http://lukeboyle.com/wp/">http://lukeboyle.com/wp/</a></p>
<h2>Type with Apps</h2><p>This idea was conceived during a thrilling trip to the laundromat. I had just seen this picture of someone making a message using app icons. <a href="http://i.imgur.com/OB2nsgy.jpg">http://i.imgur.com/OB2nsgy.jpg</a> Well, what better way to spend a Sunday than recreating this? I spent the first part of the project trying to make an accurate representation of the iOS homescreen, and once that was done I had to build a library of app icons with a letter in their icon. The process is simple, it grabs the input, splits it up into characters, and then filters out unacceptable characters. Pretty simple, but it&#39;s a great effect. <a href="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/Screen-Shot-2016-04-25-at-11.18.02-AM.png"><img src="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/Screen-Shot-2016-04-25-at-11.18.02-AM-169x300.png" alt="Screen Shot 2016-04-25 at 11.18.02 AM"/></a> <a href="http://3stacks.github.io/type-with-apps/">http://3stacks.github.io/type-with-apps/</a></p>
<h2>Pypes</h2><p>Pypes is a collaborative project between me and a <a href="http://www.brycehanscomb.com/">friend named Bryce</a>. I remember complaining endlessly about there being so few CMS platforms that just do what I want it to do and have a reasonable templating system. So we decided to make one. Not being people to shy away from a challenge, we jumped right into it. On the first night we defined a template syntax using pipes <code>||| header |||</code>. Pypes has a function that processes your the view file, finds the <code>|||</code> and then searches for the file you defined inside it. The only thing you need to do to make a new partial is make a php file in the partials folder and then reference it in the view. Super simple. While Bryce was working hard to make the RESTful API, I got to work on the admin panel (Pypes Face) which was built in Angular. The admin panel has the ability to view all posts, edit posts, create new posts and delete posts. Pypes Face has an API client for the basic http requests, and then the controllers use those functions with Promises to do things such as generating a permalink and checking if it is unique. This project is constantly evolving and we&#39;re hoping to package it up and let people use it. <a href="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/Screen-Shot-2016-04-25-at-11.29.31-AM.png"><img src="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/Screen-Shot-2016-04-25-at-11.29.31-AM-1024x675.png" alt="Screen Shot 2016-04-25 at 11.29.31 AM"/></a> I also made a text to <a href="http://3stacks.github.io/unicode-full-width/">unicode full-width translator</a> and accomplished a lot on <a href="https://agander.io">Agander</a>. When all is said and done, in the last month I have doubled my contributions in the last 12 months and I&#39;ve started several interesting projects. <a href="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/Screen-Shot-2016-04-25-at-10.35.06-AM.png"><img src="http://lukeboyle.com/wp/blog/wp-content/uploads/2016/04/Screen-Shot-2016-04-25-at-10.35.06-AM-1024x403.png" alt="Screen Shot 2016-04-25 at 10.35.06 AM"/></a> If you are going to attempt something like this, I would absolutely make a plan before you begin. I found after the first two weeks I started to get a general fatigue and didn&#39;t want to work on the projects I currently had running. To avoid this you should map out what you want to accomplish because it&#39;ll make it much more gratifying as you progress through the month. The value of this experiment is incalculable. I&#39;ve learned so much and I hope to continue my streak, however, it might be time for a holiday.</p>
</article>
						</div>
					);
				}
			}
		