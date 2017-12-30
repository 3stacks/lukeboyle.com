import React from "react";
import Helmet from "react-helmet";

export default class About extends React.Component {
    render() {
        return (
            <div className="max-width-container about-main">
                <Helmet>
                    <title>About | Luke Boyle</title>
                </Helmet>
                <h1>
                    Front End Developer from Melbourne, Australia
                </h1>
                <p>
                    Quick facts:
                </p>
                <ul>
                    <li>
                        Co-founder of <a href="https://stak.digital">Stak Digital</a>
                    </li>
                    <li>
                        Open-source advocate
                    </li>
                    <li>
                        Experienced in React, Angular and Vue.js
                    </li>
                    <li>
                        Experience with ES2018, GraphQL, Express, babel, webpack and gulp.
                    </li>
                </ul>
                <p>
                    For a sample of my open source work, you can visit my github: <a href="https://github.com/3stacks">https://github.com/3stacks</a>
                </p>
                <p>
                    For a sample of my node work, you can visit my profile on npm: <a href="https://npmjs.com/~lukeboyle">https://npmjs.com/~lukeboyle</a>
                </p>
                <p>
                    For project enquiries; go to <a href="https://stak.digital">https://stak.digital</a> and fill out your information at the bottom
                </p>
            </div>
        );
    }
}
