
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class cssVariablesACaseStudy extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2017/4/css-variables--a-case-study">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Css Variables A Case Study | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">CSS Variables: A Case Study</h1>
			</header>
		<h2>Posted on 2017-04-26 15:50:11</h2><p>In <a href="https://agander.io">Agander</a>, I made my first forays into colour themes. In a very simple approach, I have two colour schemes (light and dark) which are displayed on the body as a class (scheme-light and scheme-dark) respectively. The general approach for styling a component is as such: <code>_button.scss</code></p>
<pre><code>
		<span>{"// Define base component styles (e.g. sizing/positioning)"}</span><span>{".button {"}</span><span>{"  border: 1px solid;"}</span><span>{"  padding: 6px 5px;"}</span><span>{"}"}</span><span>{""}</span><span>{"// Dark Color scheme styles"}</span><span>{".scheme-dark {"}</span><span>{"  .button {"}</span><span>{"    background: white;"}</span><span>{"    border-color: white;"}</span><span>{"    color: black;"}</span><span>{"  }"}</span><span>{"}"}</span><span>{""}</span><span>{"// Light Color scheme styles"}</span><span>{".scheme-light {"}</span><span>{"  .button {"}</span><span>{"    background: black;"}</span><span>{"    border-color: black;"}</span><span>{"    color: white;"}</span><span>{"  }"}</span><span>{"}"}</span>
	</code></pre><p>Although this is quite lightweight, there are still issues.</p>
<ol>
<li>It puts a hard dependency on codebase changes to add, remove or modify themes,</li>
<li>It makes user defined colour schemes all but impossible</li>
<li>Simple component partials are no longer neat self-contained partials with one selector defining all the component styles</li>
<li>There are several cases where I need to have colours that contradict the global colour scheme (e.g. black text for the white modal dialog) and it requires the use of !important and many colour overrides.</li>
<li>The extensibility of the approach is very limited because as more themes are added, the stylesheets WILL get bloated and overweight.</li>
</ol>
<p>Enter the CSS Variable (the hero we need) CSS Variables are defined like so:</p>
<pre><code>
		<span>{":root { "}</span><span>{"  // Initialise the variable"}</span><span>{"  --primary-color: pink"}</span><span>{"}"}</span><span>{""}</span><span>{"p {"}</span><span>{"  color: var(--primary-color); // it's pink, baby."}</span><span>{"}"}</span>
	</code></pre><p>The <code>var</code> function also takes a second argument which is an initial/fallback value.</p>
<pre><code>
		<span>{"p {"}</span><span>{"  color: var(--primary-color, red);"}</span><span>{"}"}</span>
	</code></pre><p>CSS Variables follow block scoping principles, so, variables defined in <code>:root</code> are considered to be global variables (but may be overwritten inside specific components) and variables defined in any other element are scoped to that block of styles. This is broken down very nicely on a recent <a href="https://www.smashingmagazine.com/2017/04/start-using-css-custom-properties/#scope-and-inheritance">Smashing Magazine article</a>.</p>
<h3>How can CSS Vars help Agander?</h3><p>I recently wrote a library to ingest variable names and values and spit them onto the root element (see <a href="https://www.npmjs.com/package/@lukeboyle/sync-vars">the package</a>) The idea is that each theme would have all relevant variables defined in objects like so:</p>
<pre><code>
		<span>{"const viewState = {"}</span><span>{"  currentTheme: 'darkScheme'"}</span><span>{"}"}</span><span>{""}</span><span>{"const themes = {"}</span><span>{"  darkSheme = {"}</span><span>{"    'primary-color': {"}</span><span>{"      hex: '\#FFF'"}</span><span>{"    }"}</span><span>{"  },"}</span><span>{"  lightScheme: {"}</span><span>{"    'primary-color': {"}</span><span>{"      hex: '\#000'"}</span><span>{"    }"}</span><span>{"  }"}</span><span>{"}"}</span>
	</code></pre><p>And then when the currentTheme changes:</p>
<pre><code>
		<span>{"import syncVars from '@lukeboyle/sync-vars';"}</span><span>{""}</span><span>{"function updateCssVariablesWithCurrentScheme(colorScheme) {"}</span><span>{"  syncVars(themes[colorScheme]);"}</span><span>{"}"}</span><span>{""}</span><span>{"// if we call that function with 'darkScheme'"}</span><span>{"updateCssVariablesWithCurrentScheme('darkScheme');"}</span><span>{""}</span><span>{"<html style=\"--primary-color: \#FFF;\"></html>"}</span>
	</code></pre><p>So, how does this help? For one thing, with this approach, I no longer have to worry about adding the colour scheme classes to the body, and I don&#39;t have to do any hacky overrides, etc. <code>_buttons.scss</code> now looks like this:</p>
<pre><code>
		<span>{".button {"}</span><span>{"  border: 1px solid var(--text-color-var);"}</span><span>{"  padding: 6px 5px;"}</span><span>{"  background: var(--button-background-color-var);"}</span><span>{"  color: var(--text-color-var);"}</span><span>{"}"}</span>
	</code></pre><p>Looking forward, this approach also means that custom colour themes are very nearly in reach. It also means that colour schemes could be changed on the fly. The user could have a colour swatch tool and be previewing their theme changes live. Taking it even further, it means that the colour schemes no longer need to be a part of the codebase. It could just as easily be a JSON file on the server and changes could be flexibly pushed. Why is this exciting? Say it&#39;s Christmas time and you want to get into the spirit of things... </p>
<p><img src="http://lukeboyle.com/app/uploads/2017/04/Screen-Shot-2017-04-27-at-1.31.56-am.jpg" alt=""/> </p>
<p>With a few string replacements you have a temporary festive theme to force upon your users.</p>
<h3>Other Applications</h3><h4>Accessibility</h4><p>Sites or apps could have buttons to activate color blind mode and specific &#39;problem&#39; colours could be swapped out for friendly colours. Additionally, high contrast modes would be a breeze.</p>
<h4>Easter Eggs</h4><p>Users could activate alternate modes for websites to get a different experience.</p>
<h3>Retrospective</h3><p>CSS variables are getting me really excited because it&#39;s the first minimal overhead approach to theming in front-end only applications. This is something that will reward well structured stylesheets and result in a better experience for the user. I am looking forward to rolling out custom themes in Agander and finally getting around to making the flat UI theme I have wanted to make for some time.</p>
</article>
						</div>
					);
				}
			}
		