import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import estimateUiSrc from '../../assets/img/portfolio/estimate-ui.jpg';

export default class Portfolio extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <Helmet>
                    <title>Guesstimate | Project Case Study</title>
                </Helmet>
                <div className="single-portfolio-item">
                    <h1 className="single-portfolio-item--title">
                        Guesstimate
                    </h1>
                    <div className="single-portfolio-item--content">
                        <p>
                            What if there was a way to skirt the inaccuracy
                            issues inherent to spreadsheet estimations? What
                            if there was a way you could make accurate
                            estimations without having extremely dense
                            experience making estimations? It just so happens
                            that that exists today, and it's called
                            "Guesstimate".
                        </p>
                        <p>
                            Guesstimate was born in pursuit of a
                            solution for these problems and addresses them by
                            breaking away from traditional estimation methods.
                            Even the best spreadsheet templates have hard
                            limits on the level of detail you can go to.
                            With Guesstimate you can approach a problem as if
                            it's a fractal, where you can continue zooming in
                            and finding distinct parts until you are at a
                            comfortable level of granularity to estimate. With
                            each task you are given the choice to either assign
                            an estimate, or expand it and add sub-tasks. This
                            is roughly the same concept of "divide and conquer"
                            which inspired an algorithmic concept of the same
                            name that breaks a problem into similar/more
                            solvable problems and enables you to solve problems
                            more reliably across the set of all problems.
                        </p>
                        <p>
                            The result is a deep tree of accurate
                            micro-estimations that get summed up for you. With
                            enough discipline you can break your project into
                            provably accurate blocks and confidently embark on
                            the journey to ship it&trade;.
                        </p>
                        <img src={estimateUiSrc} alt="A tree structure of tasks"/>
                        <h3>Technology List</h3>
                        <ul>
                            <li>React</li>
                            <li>Redux</li>
                            <li>Tree data structure</li>
                        </ul>
                        <h3>Challenges</h3>
                        <p>
                            The biggest challenge was somewhat self-inflicted as
                            each task manipulation must currently be done recursively
                            which has the potential of wasting unnecessary cycles.
                            To remedy this, in the next iteration, a more easily
                            traversable data structure
                        </p>
                    </div>
                    <div className="single-portfolio-item--buttons">
                        <a target="_blank" className="single-portfolio-item--link button primary" href="https://guesstimate.io">
                            View live site
                        </a>
                        <a target="_blank" className="single-portfolio-item--link button primary" href="https://github.com/stak-digital/guesstimate">
                            See repository
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
