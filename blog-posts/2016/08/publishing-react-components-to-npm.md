# Publishing React components to npm

| Metadata name | Value                              |
| ------------- | ---------------------------------- |
| post_title    | Publishing React components to npm |
| post_date     | 2016-08-11 01:18:56                |
| post_modified | 2016-08-11 01:18:56                |
| post_status   | publish                            |
| post_type     | post                               |

Having built and published a few React components to npm, in keeping with the plug-n-play spirit of npm, I have what I 
believe to be a very simple implementation for both the development and installation of components. I published a 
boilerplate project to Git/npm and this is now my go-to whenever I need to put together an external component. 
[https://www.npmjs.com/package/@lukeboyle/react-component-boilerplate](https://www.npmjs.com/package/@lukeboyle/react-component-boilerplate) 
The basic concept is that you have an index.jsx in a 'src' folder. This should be transpiled to ES5 and output to the 
root directory called 'index.js'. In this instance, index.js is the "main" in your package.json. You may notice the 
entry "jsnext:main" in the package which points to the jsx file. This convention was established by 
rollup ([https://github.com/rollup/rollup/wiki/jsnext:main](https://github.com/rollup/rollup/wiki/jsnext:main)) 
as an entry point for ES6 modules. The idea is that when you bundle using Rollup (and the ES6 import/export syntax), 
your ES6 module will be used instead of the ES5 one. Given that we're still largely in the ES5 age, the rollup config 
generates an ES5 version (which is the main entry point) and an ES6 version in the src so you can feel free to write 
all the JSX goodness you please. The folder structure should roughly look like this:

`project-root`

```
|--src
|  |--index.jsx
|--index.js
|--rollup.config.js (OR)
|--webpack.config.js
|--demo
|  |--dist
|     |--build files
|  |--src
|     |--src files
```

`index.jsx`

```jsx harmony
import * as React from 'react';

export default function ReactComponent(props) {
    return <div>Job's Done</div>;
}
```

Also, to play your part in improving our package ecosystem, consider
namespacing your package for npm: [http://blog.npmjs.org/post/116936804365/solving-npms-hard-problem-naming-packages](http://blog.npmjs.org/post/116936804365/solving-npms-hard-problem-naming-packages)
