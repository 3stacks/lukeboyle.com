import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";

export default class Website extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <Helmet>
                    <title>Portfolio Website | Project Case Study</title>
                </Helmet>
                <div className="single-portfolio-item">
                    <h1 className="single-portfolio-item__title">
                        This website
                    </h1>
                    <div className="single-portfolio-item__content">
                        <p>
                            A progressively enhancing static site that transpiles
                            a Markdown archive of blog posts to React components
                            and then generates static html templates.
                        </p>
                        <h2>
                            Technologies
                        </h2>
                        <ul>
                            <li>
                                Progressive Enhancement
                            </li>
                            <li>
                                Gatsby static site generator
                            </li>
                            <li>
                                Service Workers (Offline cache)
                            </li>
                            <li>
                                React
                            </li>
                            <li>
                                Node.js
                            </li>
                        </ul>
                        <p>
                            To read more about the journey of creating this site,
                            read my <a href="/blog-posts/2018/01/converting-wordpress-site-to-static">blog post</a>.
                        </p>
                    </div>
                    <div className="single-portfolio-item__buttons">
                        <a target="_blank" className="button primary" href="https://github.com/3stacks/portfolio-2016">
                            See repository
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}