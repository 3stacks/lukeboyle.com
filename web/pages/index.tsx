import React from 'react';
import projects from '../data/portfolio-items';
import { MY_NAME } from '../constants';
import Layout from '../components/Layout';
import MaxWidthContainer from '../components/MaxWidthContainer';
import { LinkButton } from '../components/Button';
import { RecentStuff, Stuff } from '../index.style';
import HomeHeadBanner from '../components/HomeHeadBanner';
import Head from 'next/head';

export const Index = () => {
    const latestProject = projects[0];

    return (
        <Layout
            slug="home"
            headChildren={() => (
                <HomeHeadBanner hasColor={false}>
                    <h2>{MY_NAME}</h2>
                    <p>King of the web</p>
                </HomeHeadBanner>
            )}
        >
            <Head>
                <title>{MY_NAME} | Front End Developer</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
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
                        <h3 className="title">Do not trust Google</h3>
                        <p>
                            Why should an advertising company get to dictate
                            what you are allowed to see on the Internet? Google
                            has proven time and time again that their old slogan
                            "Don't be evil" was a meaningless platitude.
                        </p>
                        <LinkButton
                            isSecondary
                            to="/blog-posts/2020/08/do-not-trust-google"
                        >
                            Read more
                        </LinkButton>
                    </Stuff>
                </RecentStuff>
            </MaxWidthContainer>
        </Layout>
    );
};

export default Index;
