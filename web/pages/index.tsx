import React from 'react';
import projects from '../data/portfolio-items';
import { META_DESCRIPTION, MY_NAME } from '../constants';
import MaxWidthContainer from '../components/MaxWidthContainer';
import { AnchorButton } from '../components/Button';
import { RecentStuff, Stuff } from '../index.style';
import HomeHeadBanner from '../components/HomeHeadBanner';
import Head from 'next/head';
import Link from 'next/link';
import { StyledMain } from '../styled/index.style';

export const HomePage = () => {
	const latestProject = projects[0];

	return (
		<StyledMain className="main">
			<Head>
				<title>{MY_NAME} | Technology and Culture</title>
				<meta name="description" content={META_DESCRIPTION.HOME} />
			</Head>
			<div className="head-slot">
				<HomeHeadBanner hasColor={false}>
					<h2>{MY_NAME}</h2>
					<p>King of the web</p>
				</HomeHeadBanner>
			</div>
			<div className="body-slot">
				<MaxWidthContainer>
					<RecentStuff>
						<Stuff>
							<h2 className="block-header">Latest Project</h2>
							<h3 className="title">{latestProject.name}</h3>
							<p className="snippet">{latestProject.snippet}</p>
							<Link href={latestProject.link}>
								<AnchorButton href={latestProject.link}>
									Read more
								</AnchorButton>
							</Link>
						</Stuff>
						<Stuff>
							<h2 className="block-header">Latest Post</h2>
							<h3 className="title">Do not trust Google</h3>
							<p>
								Why should an advertising company get to dictate
								what you are allowed to see on the Internet?
								Google has proven time and time again that their
								old slogan "Don't be evil" was a meaningless
								platitude.
							</p>
							<Link href="/blog-posts/2020/08/do-not-trust-google">
								<AnchorButton
									isSecondary
									href="/blog-posts/2020/08/do-not-trust-google"
								>
									Read more
								</AnchorButton>
							</Link>
						</Stuff>
					</RecentStuff>
				</MaxWidthContainer>
			</div>
		</StyledMain>
	);
};

export default HomePage;
