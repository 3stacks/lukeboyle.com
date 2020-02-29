import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout/layout';
import portfolioItems from '../data/portfolio-items';
import { MaxWidthContainer } from '../styled/utils';
import { LinkButton } from '../components/button';
import { PortfolioContainer, PortfolioItem } from './portfolio.style';
import { HomeHeadBanner } from './index';

export const Portfolio = () => {
    return (
        <Layout
            isHome={false}
            slug="portfolio"
            headChildren={() => (
                <HomeHeadBanner>
                    <h1>A Sample of My Work</h1>
                </HomeHeadBanner>
            )}
        >
            <PortfolioContainer>
                <Helmet title="Development Portfolio | Luke Boyle" />
                <MaxWidthContainer className="inner">
                    {portfolioItems.map((portfolioItem, index) => {
                        return (
                            <PortfolioItem key={index}>
                                <div
                                    className="image"
                                    style={{
                                        backgroundImage: `url(${portfolioItem.thumb})`
                                    }}
                                />
                                <div className="card">
                                    <h2 className="title">
                                        {portfolioItem.shortName
                                            ? portfolioItem.shortName
                                            : portfolioItem.name}
                                    </h2>
                                    <p>{portfolioItem.snippet}</p>
                                    <LinkButton to={portfolioItem.link}>
                                        Read More
                                    </LinkButton>
                                </div>
                            </PortfolioItem>
                        );
                    })}
                </MaxWidthContainer>
            </PortfolioContainer>
        </Layout>
    );
};

export default Portfolio;
