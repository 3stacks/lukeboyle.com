# Agander

## Case Study

[2.0 is out now](https://agander.io)

Agander is an open-source platform designed to reduce the noise in your daily agenda. The concept is simple; you connect your productivity software such as your calendar or Asana tasks and you can effectively boil several tabs into one.

Version 1 was built in Vue.Js but as the complexity grew, there were some evident growing pains, so it was made from the ground up in React for Version 2.

The project started as a service just for me, but it has been expanded to include several services, including:

-   Google Calendar,
-   Google Tasks,
-   Asana Tasks,
-   Generic notepad

The service is somewhat developer focused, so current plans involve integration with Github to display issues and milestones.

## Technologies

-   React
-   AJAX (with Promises)
-   SASS
-   OAUTH 2
-   Gulp

## Local Storage

In an effort to eliminate the need for back end technologies, the current storage solution is based on browser local storage. The result of this choice is interesting because the entire state of the app can be stored in a single string. The first major milestone required a suite of local storage management functions which ended up being spun off into a package and released on [npmjs.](https://www.npmjs.com/package/@lukeboyle/local-storage-manager)

## Github

Throughout the development process, the Github repository became less of a version control tool and began to transform into a collaborative project management platform.

I was constantly trying to find new ways to make the repository easier to manage.

## Github activity

In the most active month (surrounding the release of version 1.0), the repository saw 137 commits, 6 pull requests and 21 closed issues which included various bugs and features/improvements.

## Issues and Labels

![](/portfolio-items/images/agander-issues.png)

Each issue gets a status, type and a priority to make them more searchable and more manageable.

## Semantic Commits

I made the decision to require all commits to be semantic. Semantic commits essentially have a keyword at the start of the commit to indicate what type of commit it is (e.g. ‘feat’, ‘fix’, ‘refactor’). This allows commits pieces of work to be split up into more logical segments and have more accurate descriptions.

This enables easy rollbacks to previous features or previous fixes and it also creates a computer readable commit log, effectively automating changelogs.

## Semantic Versioning

Semantic Versioning dictates that all version changes be made in increments of x.y.z (where x is major release (breaking change), y is minor release, and z is a patch).

Because of this, I can be confident that any build under the 1.x release will be compatible with currently stored app data.
