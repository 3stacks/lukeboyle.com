---
post_title: React Material-UI touch events not firing
post_date: 2016-09-24 02:32:44
post_modified: 2016-09-24 02:32:44
post_status: publish
post_type: post
post_author: Luke Boyle
---

After much frustration with this issue, I found this section in the react material-ui documentation - React-Tap-Event-Plugin. The custom components like the select field don't work well with the traditional onClick listener, so as a temporary fix, the react-tap-event-plugin must be included in your react project. The dependency is supposedly a temporary fix. See the repo here: [https://github.com/zilverline/react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin)
