
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class googleCalendarApiColorId extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/4/google-calendar-api---color-id">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Google Calendar Api Color Id | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Google Calendar API - ColorId</h1>
			</header>
		<h2>Posted on 2016-04-20 06:50:38</h2><p>When you request a Google Calendar event it will come with a colorId which is either undefined if user didn&#39;t select a colour, or between one and 11 if they did. Since I needed these for Agander, I decided to collate these for the curious. These are the corresponding colours used in the Google Calendar app.</p>
<table>

<thead>

<tr>

<td>Color ID</td>

<td>Color Name</td>

<td>Hex Code</td>

<td>Sample</td>

</tr>

</thead>

<tbody>

<tr>

<td>undefined</td>

<td>Who knows</td>

<td>#039be5</td>

<td class="color-sample"></td>

</tr>

<tr>

<td>1</td>

<td>Lavender</td>

<td>#7986cb</td>

<td class="color-sample"></td>

</tr>

<tr>

<td>2</td>

<td>Sage</td>

<td>#33b679</td>

<td class="color-sample"></td>

</tr>

<tr>

<td>3</td>

<td>Grape</td>

<td>#8e24aa</td>

<td class="color-sample"></td>

</tr>

<tr>

<td>4</td>

<td>Flamingo</td>

<td>#e67c73</td>

<td class="color-sample"></td>

</tr>

<tr>

<td>5</td>

<td>Banana</td>

<td>#f6c026</td>

<td class="color-sample"></td>

</tr>

<tr>

<td>6</td>

<td>Tangerine</td>

<td>#f5511d</td>

<td class="color-sample"></td>

</tr>

<tr>

<td>7</td>

<td>Peacock</td>

<td>#039be5</td>

<td class="color-sample"></td>

</tr>

<tr>

<td>8</td>

<td>Graphite</td>

<td>#616161</td>

<td class="color-sample"></td>

</tr>

<tr>

<td>9</td>

<td>Blueberry</td>

<td>#3f51b5</td>

<td class="color-sample"></td>

</tr>

<tr>

<td>10</td>

<td>Basil</td>

<td>#0b8043</td>

<td class="color-sample"></td>

</tr>

<tr>

<td>11</td>

<td>Tomato</td>

<td>#d60000</td>

<td class="color-sample"></td>

</tr>

</tbody>

</table>
</article>
						</div>
					);
				}
			}
		