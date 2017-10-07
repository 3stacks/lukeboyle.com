import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import issuesSrc from '../../assets/img/portfolio/issues.png';

export default class Vices extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <Helmet>
                    <title>Vices | Project Case Study</title>
                </Helmet>
                <div className="single-portfolio-item">
                    <h1 className="single-portfolio-item--title">
                        Vices
                    </h1>
                    <div className="single-portfolio-item--content">
                        <div className="case-study">
                            <div className="case-study--block">
                                <h3 className="case-study--block--title">
                                    Case Study
                                </h3>
                                <h5 className="case-study--block--subtitle">
                                    <a href="https://vices.me" target="_blank">
                                        1.0 is out now
                                    </a>
                                </h5>
                            </div>
                            <div className="case-study--block">
                                <div className="case-study--block--body">
                                    <p>
                                        I made Vices because I was spending way too much money on iced coffee and I needed a way to motivate myself to quit.
                                    </p>
                                </div>
                            </div>
                            <div className="case-study--block">
                                <h3 className="case-study--block--title">
                                    Event BUS System
                                </h3>
                                <div className="case-study--block--body">
                                    <p>
                                        The Event BUS system handles all click events in the app and adds them to a
                                        history of actions taken in the app. This could be utilised to undo actions
                                        and facilitate accurate bug reports.
                                    </p>
                                </div>
                            </div>
                            <div className="case-study--block">
                                <h3 className="case-study--block--title">
                                    Technologies
                                </h3>
                                <ul>
                                    <li>
                                        React.js
                                    </li>
                                    <li>
                                        SASS
                                    </li>
                                    <li>
                                        Gulp
                                    </li>
                                    <li>
                                        ECMAScript 6
                                    </li>
                                    <li>
                                        Material-UI
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="single-portfolio-item--buttons">
                            <a target="_blank" className="single-portfolio-item--link button primary" href="https://vices.me">
                                View live site
                            </a>
                            <a target="_blank" className="single-portfolio-item--link button primary" href="https://github.com/3stacks/vices">
                                See repository
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
