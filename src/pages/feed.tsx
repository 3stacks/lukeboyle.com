import React from 'react';
import { PAGES } from '../constants';
import Layout from '../components/Layout';
import { format } from 'date-fns';
import MaxWidthContainer from '../components/MaxWidthContainer';
import HomeHeadBanner from '../components/HomeHeadBanner';
import styled from 'styled-components';
import avatarSrc from '../assets/img/avatar.jpg';
import { blackShift } from '../styled/mixins';

const Tile = styled.div`
    width: 100%;
    padding: 20px;
    ${blackShift(5)};
    display: flex;
    align-items: flex-start;

    &:not(:last-of-type) {
        margin-bottom: 30px;
    }
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px 0 0 10px;

    address {
        font-style: normal;
        display: inline;
    }

    div:first-of-type {
        font-size: 1.5rem;

        span {
            padding: 0 5px;
        }
    }

    p {
        margin: 0;
    }
`;

const Avatar = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;
`;

const Post = ({
    postedDate,
    children
}: {
    postedDate: string;
    children: React.ReactNode;
}) => {
    return (
        <Tile>
            <Avatar src={avatarSrc} />
            <Body>
                <div>
                    <address>Luke Boyle</address>
                    <span>&middot;</span>
                    <time dateTime={postedDate}>
                        {format(new Date(postedDate), 'DD MMM')}
                    </time>
                </div>
                <div>{children}</div>
            </Body>
        </Tile>
    );
};

/**
 * TODO: add pagination
 * TODO: don't manage content directly in the component
 */
export const Index = () => {
    return (
        <Layout
            slug="feed"
            pageName={PAGES.FEED}
            headChildren={() => (
                <HomeHeadBanner hasColor>
                    <h1>The downward spiral</h1>
                </HomeHeadBanner>
            )}
        >
            <MaxWidthContainer style={{ maxWidth: 850, padding: '60px 0' }}>
                <Post postedDate="2020-08-04T10:32:52.549Z">
                    <p>
                        I'm going to destroy you with FACTS and LOGIC (that's
                        what I call my fists)
                    </p>
                </Post>
                <Post postedDate="2020-08-04T10:25:52.549Z">
                    <p>
                        I'm hosting my own Twitter-like feed with the idea that
                        it can be easily piped into an RSS feed. It would be
                        nice for everyone to just be able to host their own feed
                        and then users could just subscribe to different people
                        on some app. Then everyone owns their own data (kinda
                        like <a href="https://matrix.org">https://matrix.org</a>
                        ).
                    </p>
                </Post>
            </MaxWidthContainer>
        </Layout>
    );
};

export default Index;
