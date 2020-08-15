import React from 'react';
import { initializeApollo } from '../../lib/apolloClient';
import { gql } from '@apollo/client';
import Head from 'next/head';
import Layout from '../../components/Layout';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { ArtistList, BodyWrapper, MainHeader } from '../../styled/music.style';
import { MY_NAME, PAGES } from '../../constants';
import BlogPreview from '../../components/BlogPreview/BlogPreview';
import HomeHeadBanner from '../../components/HomeHeadBanner/HomeHeadBanner';
import truncate from 'lodash/truncate';
import {
    IDiscogsRelease,
    ILastFMAlbum,
    ILastFMArtist
} from '../../../scripts/utils/music';
import { RecentStuff, Stuff } from '../../index.style';
import { LinkButton } from '../../components/Button';

interface IProps {
    initialApolloState: {
        ROOT_QUERY: {
            musicPreviews: {
                path: string;
                fileName: string;
                componentName: string;
                postTitle: string;
                publishDate: string;
                postCategory: string;
                postType: string;
                postAuthor: string;
                snippet: string;
            }[];
            topAlbums: ILastFMAlbum[];
            topArtists: ILastFMArtist[];
            discogsCollection: IDiscogsRelease[];
        };
    };
}

export default function Music({
    initialApolloState: {
        ROOT_QUERY: { musicPreviews, topAlbums, topArtists, discogsCollection }
    }
}: IProps) {
    return (
        <main className="main">
            <Head>
                <title>Posts About Music | Luke Boyle</title>
            </Head>
            <div className="head-slot">
                <HomeHeadBanner hasColor>
                    <h1 className="site-name">Boyleing Point</h1>
                    <p>Psychotic ramblings about music</p>
                </HomeHeadBanner>
            </div>
            <div className="body-slot">
                <Head>
                    <title>Music | Luke Boyle</title>
                </Head>
                <MaxWidthContainer>
                    <BodyWrapper>
                        <div className="left">
                            <MainHeader>What's new in the crate</MainHeader>
                            <ArtistList>
                                {discogsCollection.map(release => {
                                    return (
                                        <li key={(release as any).guid}>
                                            <div className="image-wrapper">
                                                <img
                                                    src={
                                                        release.images[0].uri150
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div className="info-wrapper">
                                                <h2 className="artist-name">
                                                    {truncate(release.title, {
                                                        length: 20
                                                    })}
                                                </h2>
                                                <p className="play-count">
                                                    {release.artists_sort}
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ArtistList>
                            <MainHeader>Who I've been listening to</MainHeader>
                            <ArtistList>
                                {topArtists.map(artist => {
                                    const imageToShow =
                                        artist.image.find(
                                            image => image.size === 'large'
                                        ) || artist.image[0];
                                    return (
                                        <li key={artist.mbid}>
                                            <div className="image-wrapper">
                                                <img
                                                    src={imageToShow.link}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="info-wrapper">
                                                <h2 className="artist-name">
                                                    {truncate(artist.name, {
                                                        length: 20
                                                    })}
                                                </h2>
                                                <p className="play-count">
                                                    {artist.playcount} plays
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ArtistList>
                            <MainHeader>My most played albums</MainHeader>
                            <ArtistList>
                                {topAlbums.map(album => {
                                    const imageToShow =
                                        album.image.find(
                                            image => image.size === 'large'
                                        ) || album.image[0];
                                    return (
                                        <li key={album.mbid}>
                                            <div className="image-wrapper">
                                                <img
                                                    src={imageToShow.link}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="info-wrapper">
                                                <h2 className="artist-name">
                                                    {truncate(album.name, {
                                                        length: 20
                                                    })}
                                                </h2>
                                                <p className="play-count">
                                                    {album.playcount} plays
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ArtistList>
                        </div>
                        <div>
                            <ul>
                                {musicPreviews.map(post => {
                                    return (
                                        <li key={post.fileName}>
                                            <BlogPreview
                                                author="Luke Boyle"
                                                publishDate={new Date(
                                                    post.publishDate
                                                ).toISOString()}
                                                title={post.postTitle}
                                                slug={`/${post.path.replace(
                                                    '.md',
                                                    ''
                                                )}`}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </BodyWrapper>
                </MaxWidthContainer>
            </div>
        </main>
    );
}

export const MUSIC_POSTS_QUERY = gql`
    query MusicPosts {
        musicPreviews {
            path
            fileName
            componentName
            postTitle
            publishDate
            postCategory
            postType
            postAuthor
            snippet
        }
        topArtists {
            mbid
            playcount
            name
            artist {
                name
            }
            image {
                size
                link
            }
        }
        topAlbums {
            mbid
            name
            playcount
            image {
                size
                link
            }
        }
        discogsCollection {
            title
            artists_sort
            guid
            images {
                uri150
            }
        }
    }
`;

export async function getStaticProps() {
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: MUSIC_POSTS_QUERY
    });

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 1
    };
}
