import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import issuesSrc from '../../assets/img/portfolio/issues.png';

export default class Pypes extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <div className="single-portfolio-item">
                    <h1 className="single-portfolio-item--title">
                        Pypes
                    </h1>
                    <div className="single-portfolio-item--content">
                        <h3>
                            JSON files as a service
                        </h3>
                        <p>
                            The premise of this app was to have a fiendishly simple back-end. The global blog
                            settings and posts are all stored in a JSON file. The back-end product (Pypes Rear)
                            has a RESTful interface for getting all posts, getting posts by a permalink, getting
                            posts by a category and so on.
                        </p>
                        <p>
                            Pypes is not trying to be a WordPress killer. It’s simple to drop in and get going,
                            but for people who just want to write, it will do nicely (because not everybody needs
                            analytics or SEO).
                        </p>
                        <p>
                            The name comes from the templating system conceived late one night. The syntax is simple:
                            <code>||| header |||</code>.
                            At runtime, the index file looks for sets of ||| and will search your partials folder
                            for a matching file, and it includes the file contents.
                        </p>
                        <p>
                            Pypes Face is the admin platform which is built in Angular. Face has an API client
                            with utility functions for pulling down posts, saving new posts and updating old posts.
                            The blog controllers use these functions with heavy integration with Promises.
                        </p>
                        <h3 className="case-study--block--title">
                            Technologies – Admin Portal
                        </h3>
                        <ul>
                            <li>
                                Angular 1.5
                            </li>
                            <li>
                                AJAX with Promises
                            </li>
                            <li>
                                HTML5
                            </li>
                            <li>
                                SASS
                            </li>
                            <li>
                                Gulp
                            </li>
                            <li>
                                Bulma.io
                            </li>
                        </ul>
                        <h3 className="case-study--block--title">
                            Technologies – Rear
                        </h3>
                        <ul>
                            <li>
                                PHP
                            </li>
                            <li>
                                Slim Framework
                            </li>
                            <li>
                                HTML5
                            </li>
                            <li>
                                SASS
                            </li>
                            <li>
                                Gulp
                            </li>
                            <li>
                                Bulma.io
                            </li>
                        </ul>
                    </div>
                    <div className="single-portfolio-item--buttons">
                        <a target="_blank" className="single-portfolio-item--link button primary" href="https://github.com/3stacks/pypes-face">
                            View live site
                        </a>
                        <a target="_blank" className="single-portfolio-item--link button primary" href="https://github.com/3stacks/pypes-face">
                            See repository
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
