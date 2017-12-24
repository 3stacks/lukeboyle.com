import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import projects from '../data/portfolio-items';

export default class Index extends React.Component {
    render() {
        const latestProject = projects[0];

        return (
            <div>
                <div className="home-head-banner">
                    <h2>
                        Luke Boyle
                    </h2>
                    <p>
                        Front End Developer
                    </p>
                </div>
                <div className="latest-project-block">
                    <div className="max-width-container">
                        <h2 className="latest-project-block--title">
                            Latest Project
                        </h2>
                        <div className="latest-project-block--project">
                            <h3 className="latest-project-block--project--title">
								{latestProject.name}
                            </h3>
                            <p className="latest-project-block--project--snippet">
								{latestProject.snippet}
                            </p>
                            <a className="button secondary" href={latestProject.link}>
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
                <div className="max-width-container">
                    <div className="npm-packages-block">
                        <h2 className="npm-packages-block--title">
                            Open Source
                        </h2>
                        <p className="npm-packages-block--text">
                            I'm an advocate for open source. All of my projects are under the MIT license.
                            You can find some of my work on NPM (below).
                        </p>
                        <ul>
                            <li>
                                <a href="https://www.npmjs.com/package/@lukeboyle/lazy-slider" target="_blank" title="Find 'lazy slider' on NPM">
                                    lazy slider </a>
                            </li>
                            <li>
                                <a href="https://www.npmjs.com/package/@lukeboyle/local-storage-manager" target="_blank" title="Find 'local-storage-manager' on NPM">
                                    local-storage-manager </a>
                            </li>
                            <li>
                                <a href="https://www.npmjs.com/package/@lukeboyle/es6-module-boilerplate" target="_blank" title="Find 'es6-module-boilerplate' on NPM">
                                    es6-module-boilerplate </a>
                            </li>
                            <li>
                                <a href="https://www.npmjs.com/package/@lukeboyle/timetools" target="_blank" title="Find 'timetools' on NPM">
                                    timetools </a>
                            </li>
                            <li>
                                <a href="https://www.npmjs.com/package/@lukeboyle/mouse-near" target="_blank" title="Find 'mouse-near' on NPM">
                                    mouse-near </a>
                            </li>
                        </ul>
                    </div>
                    <div className="featured-blog-post-block">
                        <h2 className="featured-blog-post-block--title">
                            Featured Blog Post
                        </h2>
                        <p className="featured-blog-post-block--post-name">
                            Automating CSS regression testing
                        </p>
                        <a
                            className="button primary"
                            href="/blog-posts/2016/12/automating-css-regression-testing-with-argus-eyes--phantom-js"
                        >
                            Read more
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
