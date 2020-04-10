# Agander 2.0 is now out.

| Metadata name | Value                   |
| ------------- | ----------------------- |
| post_title    | Agander 2.0 is now out. |
| post_date     | 2016-06-07 23:21:12     |
| post_modified | 2016-06-07 23:21:12     |
| post_status   | publish                 |
| post_type     | post                    |
| post_author   | Luke Boyle              |

It's been about 2 and a half months since the first official full release of Agander went live, and it's out with the old in with the new.

## What's new?

Outwardly, the changes are minimal. The most obvious change is that the add module dialogue is now a modal instead of a floating column element. Various styles have been optimised and reduced as much as possible so the button sizes specifically are more consistent across browsers.

## So why the new version?

Around three quarters of the way through version 1 it became apparent that the app was outgrowing the constraints of the Vue system I had created, so the app has been rebuilt in React.js and Redux. **The standard module model** Using this model, every module has a content object and an event object under it. The content object handles calendar events, Asana workspaces and so on. Adhering to this model will allow for rapid development of new modules in future. **Events** The event system is simulated using the Redux middleware called Thunk. The base dispatch will set the event to executing and it will continue to execute until it is told to stop. If error is true, the event stops executing and and the error response is populated in the response key. Error false means the event resolved correctly and the response is the delicious events or tasks. React also makes rendering the correct component a breeze. I know to hide all content if the user hasn't authorised, and if the event is executing. Error messages are nice and simple too. https://youtu.be/T43RzjxwBys **Next Steps** Agander is being temporarily put on hold to focus on other projects - but in its current state it is very much usable. Aside from bug fixes, there will be no new features for at least a couple months while I'm working on other things. I'm really happy with how far the app has come and I can finally use it for my own agenda tracking.
