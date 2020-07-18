---
post_title: Automating CSS regression testing with Argus Eyes (PhantomJS)
post_date: 2016-12-14 02:41:39
post_modified: 2016-12-14 02:41:39
post_status: publish
post_type: post
post_author: Luke Boyle
---

I have had my eyes on Argus Eyes ([http://arguseyes.io/](http://arguseyes.io/)) for quite some time and now I have the time to implement it at work. The interface is rather simple. You define your browser breakpoints, the pages, and the parts of the pages you wish to capture. All `components` are defined with a name and a selector. For example, ".site-nav" or "body". You define all components in the components array, but then you can cherry pick which ones are used on each page. Such as, homepage may use the hero component, but about may not.

```json
{
    "sizes": ["320x480", "1280x768", "1920x1080"],
    "pages": [
        {
            "name": "homepage",
            "url": "http://localhost:3000/",
            "components": ["hero", "all"]
        }
    ],
    "components": [
        {
            "name": "all",
            "selector": "body"
        },
        {
            "name": "hero",
            "selector": ".hero"
        }
    ]
}
```

Since I'm generally against installing npm packages globally (and you probably should be [too](https://www.sitepoint.com/solve-global-npm-module-dependency-problem/)), I define my capture scripts in `package.json`. This presents the first issue: The usage of Argus is like so: `argus-eyes capture <branch-name>` But this of course only names the capture for you. It's your responsibility to switch branches. So the workflow becomes:

-   Clone `develop` branch
-   run `argus-eyes capture develop` (this is the baseline)
-   Clone `feature-branch-name`
-   run `argus-eyes capture feature-branch-name`
-   run `argus-eyes compare develop feature-branch-name`

Argus then uses blink-diff to compare the two sets of screenshots you just captured (note, you shouldn't change your config between captures) and outputs any screenshots in which there are visual differences. For example, bumping the padding on your nav will result in something like this. It's not a super intelligent representation, however, it does quickly show you that something is wrong. In my opinion, the current workflow makes it almost worth not bothering. So how do we make it a 1 step test?

## Automation

I am attempting to simulate this entire process in node. For this, we'll need a few things.

-   The ability to use git functions in node (http://www.nodegit.org/)
-   The ability to execute console commands in node (for this, I am using [shelljs](https://www.npmjs.com/package/shelljs))

I've tried to make the node script as pure as possible. I created a file called `argus-test.js`. In that, there is an individual function for each git action. First is a function to initialise the repo.

```javascript
/**
 * @param {string} path - path to the repository (.git)
 * @returns {Promise}
 */
function openRepository(path) {
    return Git.Repository.open(path);
}

// Path is based on current working directory
const repoPath = require("path").resolve("./.git");

openRepository(repoPath).then(...)
```

openRepository returns a Promise which has the reference to the repository in it. To act on the repository, we need to keep track of this returned value. Since all of the nodegit functions return Promises, we're going to be seeing a lot of `then`.

```javascript
// Initialise this let to keep track of which branch we're on
let featureBranch;

/**
 * @param {Repository} repo - The reference to the repository object
 * @returns {Promise}
 */
function saveCurrentBranch(repo) {
    return repo.getCurrentBranch();
}

openRepository(repoPath).then(
    repo => {
        saveCurrentBranch(repo).then(repoName => {
            featureBranch = repoName;
        });
    },
    err => {
        // Usually would only happen if you give it the incorrect path
        throw new Error(error);
    }
);
```

Now we have a reference to the current feature branch, we've got that stored for later. In the function where we set the featureBranch variable, we're going to execute our capture functions.

```javascript
shell.exec(
    `node node_modules/argus-eyes/bin/argus-eyes.js capture ${featureBranch}`
);

// Successful output will say something like "12 screenshots saved to .argus-eyes/feature-branch-name"
```

This is the tricky part. We have to switch branch to whatever the base is (develop in this case). This is the biggest hurdle. Although the function is simple, if there are any uncommitted changes, the function may fail. Probably best to warn the user to make sure all changes are committed or stashed first.

```javascript
/**
 * @param {Repository} repo - The reference to the repository object
 * @returns {Promise}
 */
function switchToDevelop(repo) {
    return repo.checkoutBranch('develop');
}

switchToDevelop(repo).then(...)
```

After successfully changing to develop, we still have to capture the branch and then compare them, which is done like so:

```javascript
shell.exec('node node_modules/argus-eyes/bin/argus-eyes.js capture develop');

shell.exec(
    'node node_modules/argus-eyes/bin/argus-eyes.js compare develop ' +
        featureBranch
);
```

If Argus detects any screenshots over the threshold for change, it will save the diff in a folder like `.argus-eyes/diff_develop_feature_branch_name` For the full file in action, check out this gist: [https://gist.github.com/3stacks/0976ef8a84c50c6096aea09dbbbebd88](https://gist.github.com/3stacks/0976ef8a84c50c6096aea09dbbbebd88)

## Retrospective

To improve this process, it might be an idea to save the baseline diff in the repo and then overwrite it whenever you push to that branch. This would eliminate the need to switch over the branches.
