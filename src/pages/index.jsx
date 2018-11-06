import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import projects from '../data/portfolio-items';
import {MY_NAME} from "../constants";

export default class Index extends React.Component {
    render() {
        const latestProject = projects[0];

        return (
            <div>
                <div className="home-head-banner">
                    <h2>
                        {MY_NAME}
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
                            <Link className="button secondary" to={latestProject.link}>
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="max-width-container">
                    <div className="featured-blog-post-block">
                        <h2 className="featured-blog-post-block--title">
                            Latest Post
                        </h2>
                        <p className="featured-blog-post-block--post-name">
                            Converting a WordPress site to a React static site
                        </p>
                        <Link
                            className="button primary"
                            to="/blog-posts/2018/01/converting-wordpress-site-to-static"
                        >
                            Read more
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
