# Underwriting Rules Engine for MLC Life

One of the biggest barriers when underwriting people for life insurance is the
sheer number of higher risk hobbies and lifestyle habits you have to account
for. Before the digital revolution, a prospective customer might have had to
get a form as thick as their finger and navigate through sections like a choose
your own adventure book. More antiquated digital forms still suffered from the
same verbosity and would have high drop-off rates because, generally, people just
don't enjoy clicking through 30 step forms.

The Underwriting Rules Engine (URE) plugs in to the back-end service Underwrite Me
which handles exclusions and loadings which are put together in a complex network
of flow charts comprising the application outcome matrix.

## Challenges

- Owing to the fact that any question answered may trigger additional questions
or sections, the front-end had to communicate with the server whenever the user
answered a question. Other implementations froze the user's focus and prevented
them from moving forward while passing up the new answer. I didn't want to block
the progress of the user because I was certain that would cause drop-offs/frustration.

One of the problems this created was that when users answered questions in quick
succession - due to the unpredictable nature of network speed - sometimes an older
request to the server would resolve after the most recent one. My initial thoughts
on this are documented in this [Stack Overflow question](https://stackoverflow.com/questions/46167970/given-a-set-of-promises-how-do-i-forcefully-resolve-with-the-response-of-the-la).

The chosen solution ended up being generating a unique ID for each network request
and storing the ID of the most recent request. When a request was resolved, the
ID of the request was checked against the stored ID and if it matched, the response
was considered the latest form state.

## Accomplishments

- To date, URE is my most well-tested and well-documented project. The readme was
a central wiki with vast resources ranging from basic information for new
developers on-boarding to rationales for technical decisions.
- Semantic versioning with very detailed change logs, deprecation warnings and
upgrade instructions.
- According to [this report](https://www.ifa.com.au/risk/25644-mlc-life-straight-through-acceptance-rate-triples),
after launching the URE, MLC has seen a 300% increase in straight-through processing
(i.e. no human underwriting) of life insurance applications.
- Underwrite Me comes with basic input types out of the box, so using custom tags
on certain questions, we were able to expand the range of input types

![](/images/custom-fields.png)