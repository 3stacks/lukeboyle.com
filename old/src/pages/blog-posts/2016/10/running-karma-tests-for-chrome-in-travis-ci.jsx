
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class runningKarmaTestsForChromeInTravisCi extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/10/running-karma-tests-for-chrome-in-travis-ci">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Running Karma Tests For Chrome In Travis Ci | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Running Karma tests for Chrome in Travis CI</h1>
			</header>
		<h2>Posted on 2016-10-13 02:58:59</h2><p>A quick-start guide for running Karma tests for Chrome in Travis CI. When you run Travis on a Node.js project, Travis will - by default - run <code>npm install</code> and then <code>npm test</code>. I first ran into the issue in an Angular project that had tests triggered in the <code>prepublish</code> command. My CI build failed and I decided to remove the prepublish hook and change the name of my test script until I had the time to come back. For months I&#39;ve been avoiding the issue, but I have finally solved it. The Karma docs suggest that you can run the tests in Firefox with the --browsers flag (see <a href="https://karma-runner.github.io/0.8/plus/Travis-CI.html">https://karma-runner.github.io/0.8/plus/Travis-CI.html</a>). Travis has since updated so that Chrome can be loaded into the environment. For this to work, you&#39;ll need to make changes to your <code>travis.yml</code> file and your karma config file.</p>
<h2>travis.yml</h2><p><small>Note that I&#39;m using only latest node as that is the requirement for me</small></p>
<pre><code>
		<span>{"language: node_js"}</span><span>{"  node_js:"}</span><span>{"    - \"node\""}</span><span>{"  before_script:"}</span><span>{"    - export CHROME_BIN=chromium-browser"}</span><span>{"    - export DISPLAY=:99.0"}</span><span>{"    - sh -e /etc/init.d/xvfb start"}</span>
	</code></pre><p>The before_script is the special part, which points travis in the right direction for running Chrome. The last two lines are addressed in the karma docs linked above. Personally, I am using a separate karma config file, and I want to make the changes within that config file to keep my test script clean. My test script is:</p>
<p><code>&quot;test&quot;: &quot;karma start karma.config.js&quot;</code></p>
<h2>karma.config.js</h2><pre><code>
		<span>{"const configuration = {"}</span><span>{"    files: ["}</span><span>{"        {pattern: 'tests/**/**/**.*', watched: true}"}</span><span>{"    ],"}</span><span>{"    customLaunchers: {"}</span><span>{"        chromeTravisCi: {"}</span><span>{"            base: 'Chrome',"}</span><span>{"            flags: ['--no-sandbox']"}</span><span>{"        }"}</span><span>{"    },"}</span><span>{"    frameworks: ['mocha'],"}</span><span>{"    browsers: ['Chrome'],"}</span><span>{"    failOnEmptyTestSuite: true,"}</span><span>{"    singleRun: true"}</span><span>{"};"}</span><span>{""}</span><span>{"if (process.env.TRAVIS) {"}</span><span>{"    configuration.browsers = ['chromeTravisCi']"}</span><span>{"}"}</span><span>{""}</span><span>{"module.exports = function (config) {"}</span><span>{"    config.set(configuration);"}</span><span>{"};"}</span>
	</code></pre><p>Luckily, Travis sets the process env to TRAVIS and if we check for this, we set the configuration browsers to [&#39;chromeTravisCi&#39;] which is defined in the customLaunchers. Have whatever pre-processors you need in the configuration object and it should work fine when you deploy.</p>
</article>
						</div>
					);
				}
			}
		