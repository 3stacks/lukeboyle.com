import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout/layout';
import portfolioItems from '../data/portfolio-items';
import styled from 'styled-components';
import { bp } from '../styled/mixins';
import { MaxWidthContainer } from '../styled/utils';
import { LinkButton } from '../components/button';
import { HomeHeadBanner } from './index';

const PortfolioContainer = styled.div`
    padding-top: 30px;

    h1 {
        margin-top: 0;
        font-size: 3.5rem;
        text-align: center;
        margin-bottom: 30px;
    }

    & .inner {
        display: grid;
        grid-template-columns: 1fr;
        margin-bottom: 30px;

        ${bp(
            600,
            `
			grid-template-columns: 1fr 1fr;
			grid-column-gap: 30px;
		`
        )}

        ${bp(
            800,
            `
			grid-template-columns: 1fr 1fr 1fr;
		`
        )}
    }
`;

const PortfolioItem = styled.div`
    margin-bottom: 30px;
    color: white;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    transition: all 0.3s ease-out;
    background-color: white;

    &:hover {
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.5);
        transform: translateY(-5px);
    }

    & .image {
        font-size: 0;
        img {
            width: 100%;
        }
    }
    & .image {
        height: 200px;
        width: 100%;
        border-radius: 4px 4px 0 0;
        background-size: cover;
        background-repeat: no-repeat;
    }

    & .card {
        flex: 1 0;
        color: black;
        padding: 10px;
        text-align: center;
        min-height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        & .title {
            width: 100%;
            font-size: 2.5rem;
        }

        p {
            width: 100%;
            font-size: 1.6rem;
        }

        a {
            margin-top: auto;
            font-size: 1.4rem;
        }
    }
`;

export default class Portfolio extends React.Component {
    render() {
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
                <Helmet title="Development Portfolio | Luke Boyle" />
                <PortfolioContainer>
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
                                            {portfolioItem.name}
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
    }
}
