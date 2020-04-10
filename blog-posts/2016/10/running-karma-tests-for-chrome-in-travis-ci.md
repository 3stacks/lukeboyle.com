# Running Karma tests for Chrome in Travis CI

| Metadata name | Value                                       |
| ------------- | ------------------------------------------- |
| post_title    | Running Karma tests for Chrome in Travis CI |
| post_date     | 2016-10-13 02:58:59                         |
| post_modified | 2016-10-13 02:58:59                         |
| post_status   | inherit                                     |
| post_type     | revision                                    |
| post_author   | Luke Boyle                                  |

A quick-start guide for running Karma tests for Chrome in Travis CI. When you run Travis on a Node.js project, Travis will - by default - run `npm install` and then `npm test`. I first ran into the issue in an Angular project that had tests triggered in the `prepublish` command. My CI build failed and I decided to remove the prepublish hook and change the name of my test script until I had the time to come back. For months I've been avoiding the issue, but I have finally solved it. The Karma docs suggest that you can run the tests in Firefox with the --browsers flag (see [https://karma-runner.github.io/0.8/plus/Travis-CI.html](https://karma-runner.github.io/0.8/plus/Travis-CI.html)). Travis has since updated so that Chrome can be loaded into the environment. For this to work, you'll need to make changes to your `travis.yml` file and your karma config file.

`travis.yml`

Note that I'm using only latest node as that is the requirement for me

```
  language: node_js
  node_js:
    \- "node"
  before_script:
    \- export CHROME_BIN=chromium-browser
    \- export DISPLAY=:99.0
    \- sh -e /etc/init.d/xvfb start
```

The before_script is the special part, which points travis in the right direction for running Chrome. The last two lines are addressed in the karma docs linked above. Personally, I am using a separate karma config file, and I want to make the changes within that config file to keep my test script clean. My test script is:

`"test": "karma start karma.config.js"`

`karma.config.js`

```javascript
const configuration = {
    files: [{ pattern: 'tests/**/**/**.*', watched: true }],
    customLaunchers: {
        chromeTravisCi: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        }
    },
    frameworks: ['mocha'],
    browsers: ['Chrome'],
    failOnEmptyTestSuite: true,
    singleRun: true
};

if (process.env.TRAVIS) {
    configuration.browsers = ['chromeTravisCi'];
}

module.exports = function(config) {
    config.set(configuration);
};
```

Luckily, Travis sets the process env to TRAVIS and if we check for this, we set the configuration browsers to \['chromeTravisCi'\] which is defined in the customLaunchers. Have whatever pre-processors you need in the configuration object and it should work fine when you deploy.
