import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout/layout';
import portfolioItems from '../data/portfolio-items';
import MaxWidthContainer from '../components/MaxWidthContainer';
import HomeHeadBanner from '../components/HomeHeadBanner';
import { PortfolioContainer } from './portfolio.style';
import PortfolioItem from '../components/PortfolioItem';

export const Portfolio = () => {
    return (
        <Layout
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
                    {portfolioItems.map(PortfolioItem)}
                </MaxWidthContainer>
            </PortfolioContainer>
        </Layout>
    );
};

export default Portfolio;
