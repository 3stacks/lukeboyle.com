
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class dynamicProductFilteringInShopify extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/8/dynamic-product-filtering-in-shopify">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Dynamic Product Filtering In Shopify | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Dynamic Product Filtering in Shopify</h1>
			</header>
		<h2>Posted on 2016-08-11 00:37:34</h2><pre class="disclaimer-block">Disclaimer: Shopify is not good. I recommend steering clear and opting for one of many alternatives. It's an extremely closed platform that doesn't encourage innovation and naturally leans towards bad practice. Given this, if you still have to use it, read on.
</pre>

<p>In Shopify, there is a native (albeit &#39;unsupported&#39;) filtering system. Native Filtering is based on the tags you specify on your product. If you go to your collection, you can link the user to a tag and Shopify can filter product with simple Javascript like so; collections/collection-name/tag-one/tag-two. Now given that in a collection you have access to collection.all_vendors and all_types, WHY OH WHY, is there not native filtering based on that. Filtering could EASILY be dynamic if Shopify cared enough to implement that. The &#39;official&#39; solution (as per the documentation; <a href="https://help.shopify.com/themes/customization/collections/filtering-a-collection-with-multiple-tag-drop-down">https://help.shopify.com/themes/customization/collections/filtering-a-collection-with-multiple-tag-drop-down</a>) is to make several drop downs and set tags to be a list of tags you want to allow filtering by (e.g. tags = &quot;red&quot;, &quot;blue&quot;, &quot;green&quot;). So next week when I add a yellow shirt I have to go back into the pits and add another tag? Not happening. This is how I make filters dynamic. After searching for hours, I can conclusively say that there is no open source solution for this, and given the constraints of the garbage liquid templating engine, I can confidently say that this is the least convoluted solution available. All it takes is implementing a rigid structure in your tagging system, so this is much easier on a new store. The tag structure is basically as such: category:tagName. Let&#39;s say you want to filter your products by brand. In your product page, on the tags section, enter brand:brandName. Same goes for <code>size:1</code> or <code>color:blue</code>. It&#39;s up to you how many you use, because I guarantee your collection sorting template is going to be a BIG file. The best part about all this is that there&#39;s no array filter or equivalent method in liquid, so we&#39;re going to have to do some crazy shit.</p>
<pre><code>
		<span>{"{% for tag in collection.all_tags %} <-- Start iterating over all tags"}</span><span>{"  {% if tag contains 'style' %} <-- Check if it contains your keyword"}</span><span>{"    {% capture raw_style_tags %} <-- Initialise the variable `raw_style_tags`"}</span><span>{"      {{ raw_style_tags | append : tag | append: ', ' }} <-- Build a string of tags separated by commas"}</span><span>{"    {% endcapture %}"}</span><span>{"    {% assign style_tags = raw_style_tags | split: ', ' %} <-- Split the strings on the commas to build a new array"}</span><span>{"  {% endif %}"}</span><span>{"{% endfor %}"}</span>
	</code></pre><p>The variable <code>style_tags</code> is now an array of all tags including &#39;style:&#39;. Now, you will make a select field where the options are all of your style tags. Note that current_tags returns a list of the tags you are currently filtering by.</p>
<pre><code>
		<span>{"<label>"}</span><span>{"    Shop by style"}</span><span>{"    <select class=\"coll-filter\">"}</span><span>{"        <option value=\"\">All</option>"}</span><span>{"        {% for t in style_tags %}"}</span><span>{"            {% assign tag = t | strip %}"}</span><span>{"            {% if current_tags contains tag %} <-- check if the tag is currently active - applies selected attribute"}</span><span>{"                <option value=\"{{ tag | handle }}\" selected=\"\">{{ tag | remove: 'style:' }}</option>"}</span><span>{"            {% elsif product_tags contains tag %} <-- else, just make it an option"}</span><span>{"                <option value=\"{{ tag | handle }}\">{{ tag | remove: 'style:' }}</option> <-- use the remove filter to have just the tag name"}</span><span>{"            {% endif %}"}</span><span>{"        {% endfor %}"}</span><span>{"    </select>"}</span><span>{"</label>"}</span>
	</code></pre><p>If you include the Javascript from the Shopify docs, it will automatically listen for changes to that .coll-filter. This way, if you ever add any more tags under the <code>style:</code> category, you won&#39;t have to update your view. And the best part is, you can just add a new category in your product page, copy paste those lines of code and change &#39;style&#39; to whatever your new category is called. I must reiterate, you should only use Shopify if you have no other choice. Cheers!</p>
</article>
						</div>
					);
				}
			}
		