import React from "react";
import {Link} from 'gatsby';
import projects from '../data/portfolio-items';
import {MY_NAME} from "../constants";
import Layout from '../components/layout';
import styled from 'styled-components';
import WIDTHS from '../styled/widths';
import {background, bottomTriangle, bp, topTriangle} from '../styled/mixins';
import {MaxWidthContainer} from '../styled/utils';
import {LinkButton, SecondaryLinkButton} from '../components/button';

const HomeHeadBanner = styled.div`
    width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	flex-wrap: wrap;
	height: 250px;
	
	${bp(WIDTHS.M, `
        height: 400px;
	`)}

	h2 {
		font-size: 4rem;
		margin: 0 0 15px;

		${bp(WIDTHS.M, `
		    margin: 0 0 30px;
			font-size: 6rem;
	    `)}
	}
	
	p {
		font-size: 2rem;
		margin: 0;

		${bp(WIDTHS.M, `
		    font-size: 3rem;
	    `)}

		&:first-of-type {
			margin: 0 0 15px;
		}
	}
`;

const FeatureBlogPostBlock = styled.div`
	padding: 60px 0;
	text-align: center;
	font-size: 0;
	
	& .title {
		font-size: 3.5rem;
	}
	
	& .post-name {
		font-size: 2rem;
	}
	
	& .post-image {
		margin-bottom: 20px;
	}
`;

export const LatestProjectBlock = styled.div`
	padding: 110px 0;
	margin-bottom: 60px;
	text-align: center;
	${background}
	color: white;
	position: relative;
	
	${topTriangle}
	${bottomTriangle}

	.title {
		font-size: 2.5rem;
	}
	.snippet {
		font-size: 1.6rem;
	}
`;

export default class Index extends React.Component {
    render() {
        const latestProject = projects[0];

        return (
            <Layout slug="home" isHome>
                <HomeHeadBanner>
					<h2>
						{MY_NAME}
					</h2>
					<p>
						Front End Developer
					</p>
                </HomeHeadBanner>
				<LatestProjectBlock>
					<MaxWidthContainer isSmall>
						<h2>
							Latest Project
						</h2>
						<div className="project">
							<h3 className="title">
								{latestProject.name}
							</h3>
							<p className="snippet">
								{latestProject.snippet}
							</p>
							<SecondaryLinkButton to={latestProject.link}>
								Read More
							</SecondaryLinkButton>
						</div>
					</MaxWidthContainer>
				</LatestProjectBlock>
                <MaxWidthContainer>
                    <FeatureBlogPostBlock>
						<h2 className="title">
							Latest Post
						</h2>
						<p className="post-name">
							Top albums of 2018
						</p>
						<LinkButton to="/blog-posts/2018/01/converting-wordpress-site-to-static">
							Read more
						</LinkButton>
					</FeatureBlogPostBlock>
                </MaxWidthContainer>
            </Layout>
        )
    }
}
