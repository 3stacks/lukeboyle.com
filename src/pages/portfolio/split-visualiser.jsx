import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

export default class SplitVisualiser extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <Helmet>
                    <title>Split Visualiser | Project Case Study</title>
                </Helmet>
                <div className="single-portfolio-item">
                    <h1 className="single-portfolio-item__title">
                        Split Visualiser
                    </h1>
                    <ul className="single-portfolio-item__content">
                        <li>
                            Vue.js
                        </li>
                        <li>
                            Node.js
                        </li>
                        <li>
                            Babel, Webpack
                        </li>
                    </ul>
                    <p>
                        Split Visualiser was the first app to be published under
                        the <a href="https://stak.digital">Stak Digital</a> brand
                        and it was developed during a particularly intense gym
                        fascination period. It was partly an experiment to
                        determine the feasibility of Vue 2.0 for smaller projects
                        and to see performance could scale as complexity increases.
                    </p>
                    <p>
                        Selecting exercises will highlight muscle groups based on their
                        utilisation, allowing you to gauge how effective your split is.
                    </p>
                    <div className="single-portfolio-item__buttons">
                        <a target="_blank" className="single-portfolio-item__link button primary" href="http://splitviz.io">
                            View live site
                        </a>
                        <a target="_blank" className="single-portfolio-item__link button primary" href="https://github.com/stak-digital/split-visualiser">
                            See repository
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
