import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import issuesSrc from '../../assets/img/portfolio/issues.png';

export default class Website extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <Helmet>
                    <title>Portfolio Website | Project Case Study</title>
                </Helmet>
                <div className="single-portfolio-item">
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
                            See repository
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
