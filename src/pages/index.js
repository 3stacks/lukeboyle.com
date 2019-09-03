import React from 'react';
import projects from '../data/portfolio-items';
import { MY_NAME } from '../constants';
import Layout from '../components/layout/layout.tsx';
import styled from 'styled-components';
import WIDTHS from '../styled/widths';
import { bp } from '../styled/mixins';
import { MaxWidthContainer } from '../styled/utils';
import { LinkButton } from '../components/button';

export const HomeHeadBanner = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	flex-wrap: wrap;
	height: 200px;
	text-align: center;
	padding: 0 20px;

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
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
	border-radius: 4px;
	background-color: white;
	color: #222;
	text-align: center;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;

	a {
		margin-top: auto;
	}
`;

export default class Index extends React.Component {
	render() {
		const latestProject = projects[0];

		return (
			<Layout slug="home" isHome headChildren={() => (
				<HomeHeadBanner>
					<h2>{MY_NAME}</h2>
					<p>King of the web</p>
				</HomeHeadBanner>
			)}>
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
							<LinkButton isSecondary to="/blog-posts/2019/08/github-actions-for-web-apps">
								Read more
							</LinkButton>
						</Stuff>
					</RecentStuff>
				</MaxWidthContainer>
			</Layout>
		);
	}
}
