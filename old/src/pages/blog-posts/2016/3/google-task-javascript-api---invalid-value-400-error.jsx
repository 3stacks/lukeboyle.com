
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class googleTaskJavascriptApiInvalidValue_400Error extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2016/3/google-task-javascript-api---invalid-value-400-error">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Google Task Javascript Api Invalid Value 400 Error | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Google Task Javascript API - Invalid Value 400 Error</h1>
			</header>
		<h2>Posted on 2016-03-19 13:08:01</h2><p>After a long battle with the weird Google Task Javascript API I&#39;ve established a module for <a href="http://agander.io">Agander</a> that has the ability to:</p>
<ul>
<li>Authorise a user</li>
<li>Display all tasks in a given tasklist</li>
<li>Complete a task</li>
</ul>
<p>Authorising the user and displaying their tasks is reasonably easy following the quickstart guide <a href="https://developers.google.com/google-apps/tasks/quickstart/js#prerequisites">here.</a> Essentially, requests are separated into two categories; either <code>tasks</code> or <code>tasklists</code>. When you have loaded the tasks api, you can see the basic structure and work from there. <a href="https://developers.google.com/google-apps/tasks/v1/reference/">API Reference for JS</a> To find the tasklists, you would use the list function (returns an array of tasklist objects).</p>
<pre><code>
		<span>{"function listTaskLists(gAPI) {"}</span><span>{"    var request = gAPI.client.tasks.tasklists.list({"}</span><span>{"        'maxResults': 10"}</span><span>{"    });"}</span><span>{"    request.execute();"}</span><span>{"}"}</span>
	</code></pre><p>Finding tasks in a given task list operates much the same way, however, you are dealing with Google here, so it&#39;s tasks.tasks.list... Basic parameters here would just be the tasklist you want to pull tasks from, however, there are other options.</p>
<pre><code>
		<span>{"function getTasksByListId(gAPI, tasklistId) {"}</span><span>{"    var request = gAPI.client.tasks.tasks.list({"}</span><span>{"        'tasklist': tasklistId"}</span><span>{"    })"}</span><span>{"        request.execute();"}</span>
	</code></pre><p>So, we&#39;ve covered getting the tasks, how do we manipulate it? That&#39;s where the tricky part comes in. The <code>gapi</code> client interactions we used before have an <code>update</code> method. However. Whenever I called update on anything, I got a 400 error with &#39;Invalid Value&#39;. This is a common issue I&#39;ve observed online with no real solutions. The gist of it is, that there is a bunch of &#39;required parameters&#39; for you to include in the request, but there is absolutely no documentation on this (thanks Google). To get around this, we found that it was simply easier to outright request it using the request method and giving it a url. The path parameter requires a tasklist Id, and a task id. This is basically the url that comes down with the getTasksByListId request. Make sure you define the method as PUT, and you pass the whole task object with your updated values to Google. In this instance, we are marking the task as &#39;completed&#39; and giving it a completed timestamp.</p>
<pre><code>
		<span>{"function markTaskComplete(gAPI, task) {"}</span><span>{"    gAPI.client.request({"}</span><span>{"        path: 'https://www.googleapis.com/tasks/v1/lists/' + tasklistId + '/tasks/' + task.id,"}</span><span>{"        method: 'PUT',"}</span><span>{"        body: Object.assign("}</span><span>{"            {},"}</span><span>{"            task.originalTask,"}</span><span>{"            {"}</span><span>{"                completed: new Date().toISOString(),"}</span><span>{"                status: 'completed'"}</span><span>{"            }"}</span><span>{"        )"}</span><span>{"    }).execute();"}</span><span>{"}"}</span>
	</code></pre><p>Now you have a basis, the world is your oyster.</p>
</article>
						</div>
					);
				}
			}
		