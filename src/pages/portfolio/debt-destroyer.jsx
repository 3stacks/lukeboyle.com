import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import portfolioData from '../../data/portfolio-items';
import chartsSrc from '../../assets/img/portfolio/destroyer-charts.jpg';
import {PORTFOLIO_ITEM_NAMES} from "../../constants";

export default class Portfolio extends React.Component {
    render() {
		const portfolioContent = portfolioData.find(data => data.name === PORTFOLIO_ITEM_NAMES.AGANDER);

		return (
            <div className="max-width-container">
                <Helmet>
                    <title>Debt Destroyer | Project Case Study</title>
					<meta name="description" content={portfolioContent.snippet}/>
                </Helmet>
                <div className="single-portfolio-item">
                    <h1 className="single-portfolio-item__title">
                        Debt Destroyer
                    </h1>
                    <div className="single-portfolio-item__content">
                        <p>
                            Debt Destroyer takes a list of all your debts with
                            interest rates and minimum payments and will chart
                            the time it will take you to pay off your debts
                        </p>
                        <p>
                            Additionally, you may add any extra funds you can
                            contribute to your debt each month and that will be
                            added to your monthly contributions.
                        </p>
						<figure className="single-portfolio-item__figure">
							<img src={chartsSrc} alt=""/>
                            <figcaption>
								<p>
									If you pay off a debt mid-cycle it will automatically
									roll the remainder of your available funds into the
									next debt.
                                </p>
                            </figcaption>
                        </figure>
                        <p>
                            Debt payoff order is determined using the 'snowball'
                            (lowest balance first) and 'avalanche' (highest rate first).
                        </p>
                    </div>
                    <div className="single-portfolio-item__buttons">
                        <a
                            target="_blank"
                            className="single-portfolio-item__link button primary"
                            href="https://debtdestroyer.io"
                        >
                            View live site
                        </a>
                        <a
                            target="_blank"
                            className="single-portfolio-item__link button primary"
                            href="https://github.com/3stacks/debt-destroyer"
                        >
                            See repository
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
