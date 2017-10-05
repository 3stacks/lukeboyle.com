
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class jsxInVueJs extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/9/jsx-in-vue-js">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Jsx In Vue Js | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">JSX in Vue.JS</h1>
			</header>
		<h2>Posted on 2016-09-25 12:10:58</h2><p>I&#39;ve recently been experimenting with using jsx in Vue, the Vue jsx plugin for babel and using that instead of the standard template pattern. Since there are really not any official docs for the plugin, I&#39;m going to run through a quick usage guide.</p>
<h3>Getting Started</h3><p>For my project I&#39;m using Webpack and just default npm scripts. Whatever your choice for build process the important part is what you have configured your babel config or .babelrc with.</p>
<pre><code>
		<span>{"plugins: ["}</span><span>{"    'transform-runtime',"}</span><span>{"    'transform-vue-jsx'"}</span><span>{"],"}</span><span>{"presets: ['es2015']"}</span>
	</code></pre><p>That&#39;s the basic requirement for getting started. To install those, run:</p>
<ul>
<li><code>npm install -D babel-plugin-transform-runtime</code></li>
<li><code>npm install -D babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props babel-plugin-syntax-jsx</code></li>
<li><code>npm install -D babel-preset-es2015</code></li>
</ul>
<p>The official repo for the Vue jsx is located here: <a href="https://github.com/vuejs/babel-plugin-transform-vue-jsx">https://github.com/vuejs/babel-plugin-transform-vue-jsx</a> The interesting part about VueJsx in my opinion is that it follows the Angular pattern for registering components. Whereas in React you just import a function that returns jsx and you can name it whatever, in Vue jsx you must declare the name and register the component globally. Vue has a component method that takes a name and an object with all relevant data. The difference being is that instead of a <code>template</code> entry, there&#39;s a <code>render</code> function which returns jsx.</p>
<pre><code>
		<span>{"Vue.component('jsx-example', {"}</span><span>{"  render (h) { // <-- h must be in scope"}</span><span>{"    return <div id=\"foo\">bar</div>"}</span><span>{"  }"}</span><span>{"})"}</span><span>{""}</span><span>{"// Usage"}</span><span>{""}</span><span>{"<div>"}</span><span>{"    <jsx-example/>"}</span><span>{"</div>"}</span>
	</code></pre><p><code>h</code> is the shorthand for the Vue instance $createElement method so you have to make sure that h is in the scope of your components, like so:</p>
<pre><code>
		<span>{"const pageView = new Vue({"}</span><span>{"    el: '\#root',"}</span><span>{"    data: {},"}</span><span>{"    methods: {},"}</span><span>{"    render () {"}</span><span>{"        const h = this.$createElement;"}</span><span>{"        return ("}</span><span>{"            <div>"}</span><span>{"                <jsx-example/>"}</span><span>{"            </div>"}</span><span>{"        )"}</span><span>{"    }"}</span><span>{"});"}</span>
	</code></pre><p>From the get go it seems to me like we&#39;ve lost some of the versatility that jsx provides by having to integrate it into the normal Vue component pattern.</p>
<pre><code>
		<span>{"  return ("}</span><span>{"    <div"}</span><span>{"      // event listeners are prefixed with on- or nativeOn-"}</span><span>{"      on-click={this.clickHandler}"}</span><span>{"      nativeOn-click={this.nativeClickHandler}"}</span><span>{"      key=\"key\""}</span><span>{"      ref=\"ref\">"}</span><span>{"    </div>"}</span>
	</code></pre><h3>Considerations</h3><p>There&#39;s a strange thing where on-change on a form input seems to be naturally debounced, and the <code>nativeOn-change</code> doesn&#39;t seem to be any different. The behaviour doesn&#39;t seem to be the same as the React class where you can refer to an element with <code>this.refs</code>, you need to use <code>this.$refs</code> which follows the usual Vue convention. Since there&#39;s no documentation surrounding the jsx, I&#39;m assuming the rest of the behaviour follows the standard Vue component pattern, but instead of a template, there&#39;s a <code>render</code> function. The jsx doesn&#39;t support the normal vue directives so you&#39;ll have to do any of those things programmatically.</p>
</article>
						</div>
					);
				}
			}
		