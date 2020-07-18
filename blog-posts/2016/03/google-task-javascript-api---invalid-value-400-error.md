---
post_title: Google Task Javascript API - Invalid Value 400 Error
post_date: 2016-03-19 13:08:01
post_modified: 2016-03-19 13:08:01
post_type: draft
post_status: publish
post_author: Luke Boyle
---

After a long battle with the weird Google Task Javascript API I've established a module for [Agander](http://agander.io) that has the ability to:

-   Authorise a user
-   Display all tasks in a given tasklist
-   Complete a task

Authorising the user and displaying their tasks is reasonably easy following the quickstart guide [here.](https://developers.google.com/google-apps/tasks/quickstart/js#prerequisites) Essentially, requests are separated into two categories; either `tasks` or `tasklists`. When you have loaded the tasks api, you can see the basic structure and work from there. [API Reference for JS](https://developers.google.com/google-apps/tasks/v1/reference/) To find the tasklists, you would use the list function (returns an array of tasklist objects).

    function listTaskLists(gAPI) {
        var request = gAPI.client.tasks.tasklists.list({
            'maxResults': 10
        });
        request.execute();
    }

Finding tasks in a given task list operates much the same way, however, you are dealing with Google here, so it's tasks.tasks.list... Basic parameters here would just be the tasklist you want to pull tasks from, however, there are other options.

    function getTasksByListId(gAPI, tasklistId) {
        var request = gAPI.client.tasks.tasks.list({
            'tasklist': tasklistId
        })
            request.execute();

So, we've covered getting the tasks, how do we manipulate it? That's where the tricky part comes in. The `gapi` client interactions we used before have an `update` method. However. Whenever I called update on anything, I got a 400 error with 'Invalid Value'. This is a common issue I've observed online with no real solutions. The gist of it is, that there is a bunch of 'required parameters' for you to include in the request, but there is absolutely no documentation on this (thanks Google). To get around this, we found that it was simply easier to outright request it using the request method and giving it a url. The path parameter requires a tasklist Id, and a task id. This is basically the url that comes down with the getTasksByListId request. Make sure you define the method as PUT, and you pass the whole task object with your updated values to Google. In this instance, we are marking the task as 'completed' and giving it a completed timestamp.

    function markTaskComplete(gAPI, task) {
        gAPI.client.request({
            path: 'https://www.googleapis.com/tasks/v1/lists/' + tasklistId + '/tasks/' + task.id,
            method: 'PUT',
            body: Object.assign(
                {},
                task.originalTask,
                {
                    completed: new Date().toISOString(),
                    status: 'completed'
                }
            )
        }).execute();
    }

Now you have a basis, the world is your oyster.
