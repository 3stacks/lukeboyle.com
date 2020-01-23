import React from 'react';
import projects from '../data/portfolio-items';
import { MY_NAME } from '../constants';
import Layout from '../components/layout/layout';
import styled from 'styled-components';
import WIDTHS from '../styled/widths';
import { bp } from '../styled/mixins';
import { MaxWidthContainer } from '../styled/utils';
import { LinkButton } from '../components/button';
import COLORS from '../styled/colors';

export function HomeHeadBanner({ children }) {
    return (
        <StyledBanner>
            <MaxWidthContainer>{children}</MaxWidthContainer>
        </StyledBanner>
    );
}

export const StyledBanner = styled.div`
    color: #111;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    height: 200px;
    text-align: center;

    ${bp(
        768,
        `
		height: 300px;
	`
    )}

    h1,
	h2 {
        font-size: 4rem;
        margin: 0 0 15px;

        ${bp(
            WIDTHS.M,
            `
		    margin: 0 0 30px;
			font-size: 6rem;
	    `
        )}
    }

    p {
        font-size: 2rem;
        margin: 0;

        ${bp(
            WIDTHS.M,
            `
		    font-size: 3rem;
	    `
        )}

        &:first-of-type {
            margin: 0 0 15px;
        }
    }
`;

const RecentStuff = styled.div`
    display: grid;
    padding: 30px 0;
    grid-gap: 30px;
    grid-template-columns: 1fr;

    ${bp(
        620,
        `
		grid-template-columns: 1fr 1fr;
	`
    )}
`;

const Stuff = styled.div`
    background-color: white;
    color: #111;
    text-align: center;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s ease-out, background-color 0.3s ease-out, box-shadow 0.3s ease-out;
    
    a {
        margin-top: auto;
    }
    
    &:hover {
        transform: translate(-2px,-2px);
        background-color: #fff;
        box-shadow: 4px 4px 0 0 #111;
        color: #111;
        border: 2px solid #111;
    }
`;

export default class Index extends React.Component {
    render() {
        const latestProject = projects[0];

        return (
            <Layout
                slug="home"
                isHome
                headChildren={() => (
                    <HomeHeadBanner>
                        <h2>{MY_NAME}</h2>
                        <p>King of the web</p>
                    </HomeHeadBanner>
                )}
            >
                <MaxWidthContainer>
                    <RecentStuff>
                        <Stuff>
                            <h2 className="block-header">Latest Project</h2>
                            <h3 className="title">{latestProject.name}</h3>
                            <p className="snippet">{latestProject.snippet}</p>
                            <LinkButton to={latestProject.link}>
                                Read More
                            </LinkButton>
                        </Stuff>
                        <Stuff>
                            <h2 className="block-header">Latest Post</h2>
                            <h3 className="title">
                                Github Actions for web apps
                            </h3>
                            <p>
                                Github continues to improve their offering with
                                the newly released "Github Actions" system.
                                Here's the definitive guide to deploying SPAs.
                            </p>
                            <LinkButton
                                isSecondary
                                to="/blog-posts/2019/08/github-actions-for-web-apps"
                            >
                                Read more
                            </LinkButton>
                        </Stuff>
                    </RecentStuff>
                </MaxWidthContainer>
            </Layout>
        );
    }
}
