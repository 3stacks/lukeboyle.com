import React from "react";
import {Link} from 'gatsby';
import Helmet from "react-helmet";
import Layout from '../components/layout';
import portfolioItems from '../data/portfolio-items';

export default class Portfolio extends React.Component {
    render() {
        return (
            <Layout slug="portfolio">
                <Helmet
                    title="Development Portfolio | Luke Boyle"
                />
				<div className="portfolio__container">
					<h1>
						A Sample of My Work
					</h1>
					<div className="portfolio">
						{portfolioItems.map((portfolioItem, index) => {
							return (
								<div className="portfolio--item" key={index}>
									<div
										className="portfolio--item--image"
										style={{backgroundImage: `url(${portfolioItem.thumb})`}}
									/>
									<div className="portfolio--item--card">
										<h2 className="portfolio--item--card--title">
											{portfolioItem.name}
										</h2>
										<p>
											{portfolioItem.snippet}
										</p>
										<Link className="portfolio--item--card--link button primary" href={portfolioItem.link}>
											Read More
										</Link>
									</div>
								</div>
							);
						})}
					</div>
                </div>
            </Layout>
        )
    }
}
