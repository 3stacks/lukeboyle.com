import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import issuesSrc from '../../assets/img/portfolio/issues.png';

export default class TypeWithApps extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <Helmet>
                    <title>Type With Apps | Project Case Study</title>
                </Helmet>
                <div className="single-portfolio-item">
                    <h1 className="single-portfolio-item--title">
                        Type With Apps
                    </h1>
                    <div className="single-portfolio-item--content">
                        <p>Type With Apps is the result of a hack session in a laundromat. What started as simply replicating the iOS homescreen in <strong>Angular 1.5</strong> ended as a pretty fun meme generator</p>
                        <h2>Challenges</h2>
                        <p>The biggest challenge of this project was adding support for multiple letter icons. I firstly had to consider whether the multiple letters appeared together (i.e. are there spaces in-between?). Then I had to do an initial run over the string and check if there were any matches to the multiple character icons I had. After that initial run was done, I had an array that was a mixture of letters and app icon objects. The final pass cleans up all of the single letters and the icons are output to the screen.</p>
                    </div>
                    <div className="single-portfolio-item--buttons">
                        <a target="_blank" className="single-portfolio-item--link button primary" href="http://3stacks.github.io/type-with-apps">
                            View live site
                        </a>
                        <a target="_blank" className="single-portfolio-item--link button primary" href="https://github.com/3stacks/type-with-apps">
                            See repository
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
