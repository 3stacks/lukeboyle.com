import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

export default class SplitVisualiser extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <div className="single-portfolio-item">
                    <h1 className="single-portfolio-item--title">
                        Split Visualiser </h1>
                    <ul className="single-portfolio-item--content">
                        <li>
                            Vue.js (ES2015)
                        </li>
                        <li>
                            Node.js
                        </li>
                        <li>
                            Babel, Webpack
                        </li>
                    </ul>
                    <p>
                        Split Visualiser was developed as a feasibility test for Vue 2.0 to see if the interface
                        and performance could scale to larger applications.
                    </p>
                    <div className="single-portfolio-item--buttons">
                        <a target="_blank" className="single-portfolio-item--link button primary" href="https://projects.stak.digital/split-visualiser">
                            View live site
                        </a>
                        <a target="_blank" className="single-portfolio-item--link button primary" href="https://github.com/stak-digital/split-visualiser">
                            See repository
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
