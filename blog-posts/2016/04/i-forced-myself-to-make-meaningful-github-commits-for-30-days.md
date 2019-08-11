
# I forced myself to make meaningful Github commits for 30 days.


| Metadata name | Value |
| --------- | ------ |
| post_title | I forced myself to make meaningful Github commits for 30 days. | 
| post_date | 2016-04-25 01:40:28 | 
| post_modified | 2016-04-25 01:40:28 | 
| post_status | publish | 
| post_type | post |

30 days ago I decided to see how long I could keep up a streak on Github, but I didn't want to half ass it. 1 commit days just would not do. I quickly found that if I was going to be successful I would need to make a conscious effort to reserve time and energy each day. So my typical day became:

Ride tram

Work

Lunch

Tram home

Get home

Github Work

Do my real job

Smash a sandwich and do Github work

Github Work

Github Work and human functions

Between all that there hasn't been much room to have a life. But when I look at where I was 30 days ago, I had just published Agander 1.0 and didn't have much else going on. So, I needed stuff to work on.

Portfolio
---------

First I looked to my portfolio site, which was in desperate need of an overhaul. It was a column/row layout that you could traverse using keyboard controls or swipe. Pretty ordinary. As usual, I threw myself in the deep end without any proper planning and started plugging away, and eventually I decided that I needed to do away with the rows. If each slide is a scrollable canvas the content can be much more fleshed out. So the idea became that each slide was inlined and their position would be translated depending on which slide you have selected. The tricky part was that when you scrolled down and pressed next, you would be in the middle of the slide. So I needed to figure out how to make it fixed while it was off-screen. With this system, when you hit next, you'll be at the top of the next slide. I'm hoping to figure out a more user friendly way of generating the slides and then I'll package it up and release it as a site plugin. The slide classes are applied using JavaScript so it has a nice no-js fallback where all the slides just stack naturally and you can scroll down. Next step will be to add little thumbnails to signify the slides and then force IE into no-js mode because it doesn't support this tech. This is live here: http://lukeboyle.com/

Type with Apps
--------------

This idea was conceived during a thrilling trip to the laundromat. I had just seen this picture of someone making a message using app icons. http://i.imgur.com/OB2nsgy.jpg Well, what better way to spend a Sunday than recreating this? I spent the first part of the project trying to make an accurate representation of the iOS homescreen, and once that was done I had to build a library of app icons with a letter in their icon. The process is simple, it grabs the input, splits it up into characters, and then filters out unacceptable characters. Pretty simple, but it's a great effect. http://type-with-apps.3stacks.me

Pypes
-----

Pypes is a collaborative project between me and a [friend named Bryce](http://www.brycehanscomb.com/). I remember complaining endlessly about there being so few CMS platforms that just do what I want it to do and have a reasonable templating system. So we decided to make one. Not being people to shy away from a challenge, we jumped right into it. On the first night we defined a template syntax using pipes `||| header |||`. Pypes has a function that processes your the view file, finds the `|||` and then searches for the file you defined inside it. The only thing you need to do to make a new partial is make a php file in the partials folder and then reference it in the view. Super simple. While Bryce was working hard to make the RESTful API, I got to work on the admin panel (Pypes Face) which was built in Angular. The admin panel has the ability to view all posts, edit posts, create new posts and delete posts. Pypes Face has an API client for the basic http requests, and then the controllers use those functions with Promises to do things such as generating a permalink and checking if it is unique. This project is constantly evolving and we're hoping to package it up and let people use it. If you are going to attempt something like this, I would absolutely make a plan before you begin. I found after the first two weeks I started to get a general fatigue and didn't want to work on the projects I currently had running. To avoid this you should map out what you want to accomplish because it'll make it much more gratifying as you progress through the month. The value of this experiment is incalculable. I've learned so much and I hope to continue my streak, however, it might be time for a holiday.
        