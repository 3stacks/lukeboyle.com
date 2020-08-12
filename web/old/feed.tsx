import React from 'react';
import { PAGES } from '../constants';
import Layout from '../components/Layout';
import { format } from 'date-fns';
import MaxWidthContainer from '../components/MaxWidthContainer';
import HomeHeadBanner from '../components/HomeHeadBanner';
import styled, { css } from 'styled-components';
import avatarSrc from '../assets/img/avatar.jpg';
import { blackShift, bp } from '../styled/mixins';
import { BodyWrapper } from '../styled/music.style';
import { CUSTOM_PROPERTIES } from '../styled/colors';

const Table = styled.table`
    font-size: 1.6rem;
    margin: 1rem 0;

    td {
        padding: 5px;
        border: 2px solid ${CUSTOM_PROPERTIES.COLOR_TEXT};
    }
`;

const Tile = styled.article`
    width: 100%;
    padding: 10px;
    ${blackShift(5)};
    display: flex;
    align-items: flex-start;

    ${bp(
        768,
        css`
            padding: 20px;
        `
    )}

    &:not(:last-of-type) {
        margin-bottom: 15px;
        ${bp(
            768,
            css`
                margin-bottom: 30px;
            `
        )}
    }
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 5px 0 0 10px;

    ${bp(
        768,
        css`
            padding: 5px 0 0 10px;
        `
    )}

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
    width: 50px;
    height: 50px;
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
            <MaxWidthContainer style={{ maxWidth: 850 }}>
                <BodyWrapper style={{ display: 'block' }}>
                    <Post postedDate="2020-08-11T20:46:52.549Z">
                        <p>
                            Is it possible that the Australian government{' '}
                            <a href="https://www.gizmodo.com.au/2020/03/huawei-5g-australia/">
                                banned Huawei
                            </a>{' '}
                            in a deliberate attempt to slow the roll-out of the
                            5G? Surely they would like to recoup some of the
                            $48.7bn{' '}
                            <a href="https://www.smh.com.au/business/companies/nbn-rollout-cost-to-jump-by-2-billion-20180831-p500yw.html">
                                [1]
                            </a>{' '}
                            they've invested into the abject failure that is the
                            NBN. All you need to do is look at Telstra's
                            official speed metrics between their supported
                            broadband technologies to see that NBN is a bad
                            service.
                        </p>
                        <figure>
                            <Table>
                                <thead>
                                    <tr>
                                        <td></td>
                                        <td>Peak Speed</td>
                                        <td>Latency</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>4G</td>
                                        <td>100-300 Mbps</td>
                                        <td>50ms</td>
                                    </tr>
                                    <tr>
                                        <td>5G</td>
                                        <td>1-20 Gbps</td>
                                        <td>1-6ms</td>
                                    </tr>
                                    <tr>
                                        <td>NBN</td>
                                        <td>12-100 Mbps</td>
                                        <td>may vary</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <figcaption>
                                Table data:{' '}
                                <a href="https://telstraventures.com/5g-australia-how-it-affects-businesses/">
                                    [2]
                                </a>
                                . <br /> Expected median speed in San Francisco
                                (under average network load) market is 1.4Gbps
                                with latency of 4.9ms{' '}
                                <a href="https://www.whistleout.com.au/MobilePhones/Guides/5g-in-australia-what-you-need-to-know">
                                    [3]
                                </a>
                            </figcaption>
                        </figure>
                        <p>
                            If it came out that this was the case then I
                            wouldn't be surprised if they were also responsible
                            for the proliferation of 5G conspiracy theories
                        </p>
                    </Post>
                    <Post postedDate="2020-08-04T10:32:52.549Z">
                        <p>
                            I'm going to destroy you with FACTS and LOGIC
                            (that's what I call my fists)
                        </p>
                    </Post>
                    <Post postedDate="2020-08-04T10:25:52.549Z">
                        <p>
                            I'm hosting my own Twitter-like feed with the idea
                            that it can be easily piped into an RSS feed. It
                            would be nice for everyone to just be able to host
                            their own feed and then users could just subscribe
                            to different people on some app. Then everyone owns
                            their own data (kinda like{' '}
                            <a href="https://matrix.org">https://matrix.org</a>
                            ).
                        </p>
                    </Post>
                </BodyWrapper>
            </MaxWidthContainer>
        </Layout>
    );
};

export default Index;
