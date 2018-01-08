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
                    </div>
                    <div className="single-portfolio-item__buttons">
                        <a target="_blank" className="button primary" href="https://github.com/3stacks/portfolio-2016">
=======
                    <h1 className="single-portfolio-item--title">
                        This website
                    </h1>
                    <div className="single-portfolio-item--content">
                        <p>
                            The last iteration of this website was a truly insane
                            infinite scrolling carousel that was very overwhelming
                            to anyone who dare behold it, so with this version
                            (which recently had its first birthday) I decided to
                            go with a much more content focused design since I
                            actually wanted to start writing more publicly.
                        </p>
                        <p>
                            At the time, I didn't want to sink a lot of effort
                            into it, so WordPress was identified as the path of
                            least resistance. It was working well and was quite
                            fast (for a WordPress website)
                        </p>
                    </div>
                    <div className="single-portfolio-item--buttons">
                        <a target="_blank" className="single-portfolio-item--link button primary" href="https://github.com/3stacks/portfolio-2016">
>>>>>>> master
                            See repository
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
