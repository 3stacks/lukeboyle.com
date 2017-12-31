import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import portfolioItems from '../data/portfolio-items';

export default class Portfolio extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <Helmet
                    title="Development Portfolio | Luke Boyle"
                />
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
                                    <a className="portfolio--item--card--link button primary" href={portfolioItem.link}>
                                        Read More
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}
