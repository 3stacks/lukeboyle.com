import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import issuesSrc from '../../assets/img/portfolio/issues.png';

export default class Portfolio extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <Helmet>
                    <title>Angular 1.5 Case Study</title>
                </Helmet>
                <div className="single-portfolio-item">
                    <h1 className="single-portfolio-item__title">
                        Broccoli and Co.
                    </h1>
                    <div className="single-portfolio-item__content">
                        <h2>
                            Coming soon
                        </h2>
                    </div>
                    <div className="single-portfolio-item__buttons">
                        <a target="_blank" className="single-portfolio-item__link button primary" href="http://broccoli.3stacks.me">
                            View live site
                        </a>
                        <a target="_blank" className="single-portfolio-item__link button primary" href="http://github.com/3stacks/broccoli-and-co">
                            See repository
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
