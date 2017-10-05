
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class automatingCssRegressionTestingWithArgusEyesPhantomJs extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/12/automating-css-regression-testing-with-argus-eyes--phantom-js">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Automating Css Regression Testing With Argus Eyes Phantom Js | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Automating CSS regression testing with Argus Eyes (PhantomJS)</h1>
			</header>
		<h2>Posted on 2016-12-14 02:41:39</h2><p>I have had my eyes on Argus Eyes (<a href="http://arguseyes.io/">http://arguseyes.io/</a>) for quite some time and now I have the time to implement it at work. The interface is rather simple. You define your browser breakpoints, the pages, and the parts of the pages you wish to capture. All <code>components</code> are defined with a name and a selector. For example, &quot;.site-nav&quot; or &quot;body&quot;. You define all components in the components array, but then you can cherry pick which ones are used on each page. Such as, homepage may use the hero component, but about may not.</p>
<pre><code>
		<span>{"{"}</span><span>{"  \"sizes\": [ \"320x480\", \"1280x768\", \"1920x1080\" ],"}</span><span>{"  \"pages\": ["}</span><span>{"    {"}</span><span>{"      \"name\": \"homepage\","}</span><span>{"      \"url\": \"http://localhost:3000/\","}</span><span>{"      \"components\": [ \"hero\", \"all\" ]"}</span><span>{"    }"}</span><span>{"  ],"}</span><span>{"  \"components\": ["}</span><span>{"    {"}</span><span>{"      \"name\": \"all\","}</span><span>{"      \"selector\": \"body\""}</span><span>{"    },"}</span><span>{"    {"}</span><span>{"      \"name\": \"hero\","}</span><span>{"      \"selector\": \".hero\""}</span><span>{"    }"}</span><span>{"  ]"}</span><span>{"}"}</span>
	</code></pre><p>Since I&#39;m generally against installing npm packages globally (and you probably should be <a href="https://www.sitepoint.com/solve-global-npm-module-dependency-problem/">too</a>), I define my capture scripts in <code>package.json</code>. This presents the first issue: The usage of Argus is like so: <code>argus-eyes capture &lt;branch-name&gt;</code> But this of course only names the capture for you. It&#39;s your responsibility to switch branches. So the workflow becomes:</p>
<ul>
<li>Clone <code>develop</code> branch</li>
<li>run <code>argus-eyes capture develop</code> (this is the baseline)</li>
<li>Clone <code>feature-branch-name</code></li>
<li>run <code>argus-eyes capture feature-branch-name</code></li>
<li>run <code>argus-eyes compare develop feature-branch-name</code></li>
</ul>
<p>Argus then uses blink-diff to compare the two sets of screenshots you just captured (note, you shouldn&#39;t change your config between captures) and outputs any screenshots in which there are visual differences. For example, bumping the padding on your nav will result in something like this. <img src="http://lukeboyle.com/app/uploads/2016/12/nav.png" alt="nav"/> It&#39;s not a super intelligent representation, however, it does quickly show you that something is wrong. In my opinion, the current workflow makes it almost worth not bothering. So how do we make it a 1 step test?</p>
<h2>Automation</h2><p>I am attempting to simulate this entire process in node. For this, we&#39;ll need a few things.</p>
<ul>
<li>The ability to use git functions in node (<a href="http://www.nodegit.org/">http://www.nodegit.org/</a>)</li>
<li>The ability to execute console commands in node (for this, I am using <a href="https://www.npmjs.com/package/shelljs">shelljs</a>)</li>
</ul>
<p>I&#39;ve tried to make the node script as pure as possible. I created a file called <code>argus-test.js</code>. In that, there is an individual function for each git action. First is a function to initialise the repo.</p>
<pre><code>
		<span>{"/**"}</span><span>{" * @param {string} path - path to the repository (.git)"}</span><span>{" * @returns {Promise}"}</span><span>{" */"}</span><span>{"function openRepository(path) {"}</span><span>{"    return Git.Repository.open(path);"}</span><span>{"}"}</span><span>{""}</span><span>{"// Path is based on current working directory"}</span><span>{"const repoPath = require(\"path\").resolve(\"./.git\");"}</span><span>{""}</span><span>{"openRepository(repoPath).then(...)"}</span>
	</code></pre><p>openRepository returns a Promise which has the reference to the repository in it. To act on the repository, we need to keep track of this returned value. Since all of the nodegit functions return Promises, we&#39;re going to be seeing a lot of <code>then</code>.</p>
<pre><code>
		<span>{"// Initialise this let to keep track of which branch we're on"}</span><span>{"let featureBranch;"}</span><span>{""}</span><span>{"/**"}</span><span>{" * @param {Repository} repo - The reference to the repository object"}</span><span>{" * @returns {Promise}"}</span><span>{" */"}</span><span>{"function saveCurrentBranch(repo) {"}</span><span>{"    return repo.getCurrentBranch();"}</span><span>{"}"}</span><span>{""}</span><span>{"openRepository(repoPath).then("}</span><span>{"    repo => {"}</span><span>{"        saveCurrentBranch(repo).then("}</span><span>{"            repoName => {"}</span><span>{"                featureBranch = repoName"}</span><span>{"            })"}</span><span>{"    },"}</span><span>{"    err => {"}</span><span>{"        // Usually would only happen if you give it the incorrect path"}</span><span>{"        throw new Error(error)"}</span><span>{"    }"}</span><span>{");"}</span>
	</code></pre><p>Now we have a reference to the current feature branch, we&#39;ve got that stored for later. In the function where we set the featureBranch variable, we&#39;re going to execute our capture functions.</p>
<pre><code>
		<span>{"shell.exec(`node node_modules/argus-eyes/bin/argus-eyes.js capture ${featureBranch}`);"}</span><span>{""}</span><span>{"// Successful output will say something like \"12 screenshots saved to .argus-eyes/feature-branch-name\""}</span>
	</code></pre><p>This is the tricky part. We have to switch branch to whatever the base is (develop in this case). This is the biggest hurdle. Although the function is simple, if there are any uncommitted changes, the function may fail. Probably best to warn the user to make sure all changes are committed or stashed first.</p>
<pre><code>
		<span>{"/**"}</span><span>{" * @param {Repository} repo - The reference to the repository object"}</span><span>{" * @returns {Promise}"}</span><span>{" */"}</span><span>{"function switchToDevelop(repo) {"}</span><span>{"    return repo.checkoutBranch('develop');"}</span><span>{"}"}</span><span>{""}</span><span>{"switchToDevelop(repo).then(...)"}</span>
	</code></pre><p>After successfully changing to develop, we still have to capture the branch and then compare them, which is done like so:</p>
<pre><code>
		<span>{"shell.exec('node node_modules/argus-eyes/bin/argus-eyes.js capture develop');"}</span><span>{""}</span><span>{"shell.exec('node node_modules/argus-eyes/bin/argus-eyes.js compare develop ' + featureBranch);"}</span>
	</code></pre><p>If Argus detects any screenshots over the threshold for change, it will save the diff in a folder like <code>.argus-eyes/diff_develop_feature_branch_name</code> For the full file in action, check out this gist: <a href="https://gist.github.com/3stacks/0976ef8a84c50c6096aea09dbbbebd88">https://gist.github.com/3stacks/0976ef8a84c50c6096aea09dbbbebd88</a></p>
<h2>Retrospective</h2><p>To improve this process, it might be an idea to save the baseline diff in the repo and then overwrite it whenever you push to that branch. This would eliminate the need to switch over the branches.</p>
</article>
						</div>
					);
				}
			}
		