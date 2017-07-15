import React from "react";
import Helmet from "react-helmet";

export default class About extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <Helmet>
                    <title>About | Luke Boyle</title>
                </Helmet>
                <h1>
                    Front End Developer from Melbourne, Australia
                </h1>
                <p>
                    Experience with React, Angular and Vue.js.
                </p>
                <p>
                    Experience with ES2015, babel, webpack and gulp.
                </p>
                <p>
                    For a sample of my open source work, you can visit my github: <a href="https://github.com/3stacks">https://github.com/3stacks</a>
                </p>
                <p>
                    For a sample of my node work, you can visit my profile on npm <a href="https://npmjs.com/~lukeboyle">https://npmjs.com/~lukeboyle</a>
                </p>
            </div>
        )
    }
}
