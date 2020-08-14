import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import portfolioItems from '../../data/portfolio-items';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import HomeHeadBanner from '../../components/HomeHeadBanner';
import { PortfolioContainer } from '../../styled/portfolio.style';
import PortfolioItem from '../../components/PortfolioItem';

export const Portfolio = () => {
    return (
        <Layout
            slug="portfolio"
            headChildren={() => (
                <HomeHeadBanner hasColor={false}>
                    <h1>A Sample of My Work</h1>
                </HomeHeadBanner>
            )}
        >
            <PortfolioContainer>
                <Head>
                    <title>Development Portfolio | Luke Boyle</title>
                </Head>
                <MaxWidthContainer className="inner">
                    {portfolioItems.map(PortfolioItem)}
                </MaxWidthContainer>
            </PortfolioContainer>
        </Layout>
    );
};

export default Portfolio;
