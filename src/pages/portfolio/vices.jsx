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
                    <h1 className="single-portfolio-item__title">
                        Vices
                    </h1>
                    <div className="single-portfolio-item__content">
                        <div className="case-study">
                            <div className="case-study__block">
                                <h2 className="case-study__block__title">
                                    Case Study
                                </h2>
                                <a href="https://vices.me" target="_blank">
                                    2.0 is out now
                                </a>
                            </div>
                            <div className="case-study__block">
                                <div className="case-study__block__body">
                                    <p>
                                        I made Vices because I was spending way too much money on iced coffee and I needed a way to motivate myself to quit.
                                    </p>
                                </div>
                            </div>
                            <div className="case-study__block">
                                <h2 className="case-study__block__title">
                                    Event BUS System
                                </h2>
                                <div className="case-study__block__body">
                                    <p>
                                        The Event BUS system is a flux-like
                                        state storage system that handles all
                                        events in the app and adds them to a
                                        history of actions taken in the app.
                                        This could be utilised to undo actions
                                        and facilitate accurate bug reports.
                                    </p>
                                </div>
                            </div>
                            <div className="case-study__block">
                                <h2 className="case-study__block__title">
                                    Technologies
                                </h2>
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
                                        Ant Design Language
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="single-portfolio-item__buttons">
                            <a target="_blank" className="single-portfolio-item__link button primary" href="https://vices.me">
                                View live site
                            </a>
                            <a target="_blank" className="single-portfolio-item__link button primary" href="https://github.com/3stacks/vices">
                                See repository
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
