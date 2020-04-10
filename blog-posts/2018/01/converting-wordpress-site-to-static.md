# Converting a WordPress site to a React static site

| Metadata name | Value                                              |
| ------------- | -------------------------------------------------- |
| post_title    | Converting a WordPress site to a React static site |
| post_date     | 2018-01-08 00:00:00                                |
| post_modified | 2018-01-08 00:00:00                                |
| post_status   | publish                                            |
| post_type     | revision                                           |
| post_author   | Luke Boyle                                         |

The last iteration of this website was a truly insane infinite scrolling
carousel that was very overwhelming to anyone who dare behold it, so with this
version (which recently had its first birthday) I decided to go with a much
more content focused design since I actually wanted to start writing more
publicly. There's also something to be said about not confusing people or
forcing them into epileptic fits.

At the time, I didn't want to sink a lot of time into it, so WordPress was
identified as the path of least resistance. I used Bedrock by Roots to version
control my plugins and WordPress with Composer. It was working well and was
quite fast (for a WordPress website), but it still suffered from a fairly
fundamental issue of not being able to version control content. WP apologists
might tell you to store your database dumps in your repo, but to them I say;
"yeah, nah". If you ever have the misfortune of looking at a WP database dump,
you'll realise there’s about a billion lines of muck which is totally
irrelevant to the content and composition of your website and I don’t
particularly like the idea of storing my users table in a public git repository
anyway. In spite of my whinging, the version controlled content pain point was
more of an under-the-tongue ulcer type of pain than a broken arm so I didn't
worry about it. One day I made the mistake of upgrading the WP version on my
server and I hadn't copied the install to my local, so there was a lot of out
of sync content. So you can imagine I was pretty happy when I found out my
login no longer worked, I couldn’t reset my password and changing the password
directly in the database didn't work. I took an sql dump of the database and
loaded it into my local only to find the Advanced Custom Fields don’t appear
to be stored in the database, so when I salvaged the content it was totally
broken.

Then it hit me. What if I get a JSON dump of my posts from the database and
turn that into a static version? So, what output format would be most suitable
for an archive of text posts?

### Markdown: A New Hope

Markdown was invented by notable 'f-word' writer [John Gruber](https://daringfireball.net) in 2004 and it
has since become a staple in the development world. I chose to use Markdown
as the output because it provides simple shorthands to represent markup so I
knew I could get tidy archiving in Github that would be nicely rendered as
html in the web view, but the posts would still be readable (and writable for
future posts) when looking at the source. I created a [node package](https://www.npmjs.com/package/@lukeboyle/wordpress-to-markdown) for
generating an archive and published it to npm in the
hopes that it might address the problem for other people too.

Now I have my posts nicely sorted and stored in a [repo](https://github.com/3stacks/blog-posts/blob/master/2017/04/css-variables--a-case-study.md),
but the problem with generating an archive of Markdown files is then you just
have an archive of Markdown files to deal with.

The website is built with the static site generator "Gatsby", so all pages
are React components which really adds a lot of flexibility. For example, when
generating blog post components I can make the title render as a link to the
blog post slug but only when it appears on the front page.

The ingestion strategy is to add the blog-posts repository as a submodule so
I can then update and push those independently. Then, at compile time, I would
read the archive of blog posts and generate:

1. A root blog page that lists the content of posts in reverse-chronological
   order with pagination
2. An individual page for each blog post.

The script that is responsible for this is really something to behold (you can
see that [here](https://github.com/3stacks/portfolio-2016/blob/master/scripts/blog-post.js)).
The process is such that all markdown files are grabbed from the archive, then
for each post, the script will parse out a metadata table in the top of the
file that has the post title and whether or not it is a draft.
That post is then passed to the markdown renderer and we generate a blog post
component with that rendered content. That blog post component is then given
its own page component and it’s stitched onto the aggregate blog post list.
The blog post list is then parsed out into pages which are output as components
and voilà. I suppose if there’s a gap for it, I could publish a "WordPress
Markdown archive to React static site" package, but it may be a bit too niche.

The end result is an overall slimmer repository since all of the blog posts
are stored in a different repository and the generated pages are not committed
which lends itself perfectly to an automated deployment service. It also
allowed for much less human intervention in the creative process.

The main caveat I’ve discovered in this transition is that I didn't have a
solution for porting assets (such as embedded images) to the markdown archive.
Currently, any embedded images will 404 until they are added manually.
This definitely isn't ideal and if I ever get a chance I plan to package all the
linked assets down into each blog post.
