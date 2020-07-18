---
post_title: Responsive Definition Lists: Solved by flexbox
post_date: 2017-03-29 12:16:17                           
post_modified: 2017-03-29 12:16:17                           
post_status: draft                                         
post_type: revision                                      
post_author: Luke Boyle                                    
---

Consider the definition list. Here's a simple example. The standard behaviour would have the term and definition both as block level elements, naturally stacking down like so.

<dl>

<dt>Term 1</dt>

<dd>A longer definiton. A definition usually expands on the term.🌚</dd>

<dt>Term 2</dt>

<dd>A longer definiton. A definition usually expands on the term.🌚</dd>

</dl>

But what if we want the term and definition to sit inline? This usage is semantically a dl, but traditionally, this has been a serious pain in the ass if you want consistent spacing between the terms/definitions. The image below exhibits a compromise I made with the designer on a previous project. ![](http://lukeboyle.com/app/uploads/2017/03/Screen-Shot-2017-03-29-at-10.58.59-pm.png) Making the dt/dd inline-block works to a certain degree, however, when setting widths explicitly you will have serious issues going down the breakpoints. The `display:block` span just forces the content to stay in it's respective line. This, however, is not correct usage, as a `dl` is only supposed to have `dt` or `dd` elements inside it. EDIT: Since working on this project, it looks like we're now permitted to wrap a `dt+dd` group in a div to control flow. So how can flexbox help us here?
