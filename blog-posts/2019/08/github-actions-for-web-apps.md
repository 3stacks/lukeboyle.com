# Github Actions for web apps

| Metadata name | Value |
| --------- | ------ |
| post_title | Github Actions for web apps |
| post_date | 2019-08-12 00:00:00 |
| post_modified | 2019-08-12 00:00:00 |
| post_status | draft |
| post_type | revision |

Quick facts

Arguably, the key feature that made Gitlab a market leading platform was
their decision to build the platform as an end-to-end application
delivery service including version control, CI, Infrastructure,
community engagement, and so on. The simplicity that comes with this
centralisation made Gitlab really stand out when compared to
Atlassian's suite of Bitbucket, Jira, Bamboo. Even more, when compared
to Github at the time, the market offering was quite limited.

It has been a couple years since Gitlab's rise to prominence and the
market has certainly shifted. Even before Github was acquired by Microsoft
in Mid 2018 ([source](https://github.blog/2018-06-04-github-microsoft/)),
they were hard at work pushing out feature after feature.

Off the top of my head, I can recall these:

- Projects (Kanban boards with automated status changes)
- Sponsor program
- Package Registry (npm, NuGet, Ruby gems, all in the same platform)
- Github Actions (my personal favourite)

Github actions is now in open beta
(You can opt in here: [https://github.com/features/actions](https://github.com/features/actions))
and it enables you to set up containerised builds, testing, deployments
in response to several signals, including push, pull requests, tags.

The process is much the same as something like CircleCI, Travis, or Buildkite.
The integration for CI checks on pull requests and commits has been in
Github for years, allowing early warning for pull requests that break
the build.

In this post I'll be showing you how to set up to build and release
a single-page app running React.
