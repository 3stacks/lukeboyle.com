import React, { useState, useEffect } from 'react';
import truncate from 'lodash/truncate';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../../components/layout/layout';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { Link } from 'gatsby';
import {
    getDiscogsCollectionItems,
    getTopArtists,
    getTopAlbums
} from '../../../scripts/utils/music';
import postData from '../../data/music-posts.json';
import prefetchedArtistData from '../../data/artists.json';
import prefetchedAlbumData from '../../data/albums.json';
import prefetchedCrateData from '../../data/crate.json';
import { BodyWrapper, ArtistList, MainHeader } from './music.style';

interface IProps {
    data: {
        site: {
            siteMetadata: {
                lastFMApiKey: string;
                discogsApiKey: string;
            };
        };
    };
}

export default function Music({ data }: IProps) {
    const [artistData, updateArtistData] = useState(prefetchedArtistData);
    const [albumData, updateAlbumData] = useState(prefetchedAlbumData);
    const [crateData, updateCrateData] = useState(prefetchedCrateData);

    useEffect(() => {
        let isCancelled = false;

        async function fetchData() {
            const LAST_FM_API_KEY = data.site.siteMetadata.lastFMApiKey;
            const DISCOGS_API_KEY = data.site.siteMetadata.discogsApiKey;

            try {
                const albumResponse = await getTopAlbums(LAST_FM_API_KEY);
                const artistResponse = await getTopArtists(LAST_FM_API_KEY);
                const discogsResponse = await getDiscogsCollectionItems(
                    DISCOGS_API_KEY
                );

                if (!isCancelled) {
                    updateArtistData(artistResponse);
                    updateAlbumData(albumResponse);
                    updateCrateData(discogsResponse);
                }
            } catch (e) {
                console.error(e);
            }
        }

        fetchData();

        return () => (isCancelled = true);
    }, []);

    return (
        <Layout isHome={false} slug="music">
            <Helmet title="Music | Luke Boyle" />
            <MaxWidthContainer>
                <BodyWrapper>
                    <div className="left">
                        <MainHeader>Recent posts</MainHeader>
                        <ul>
                            {postData.map(post => {
                                return (
                                    <li key={post.fileName}>
                                        <Link
                                            to={`/${post.path.replace(
                                                '.md',
                                                ''
                                            )}`}
                                        >
                                            {post.postTitle}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div>
                        {/*<MainHeader>Latest post</MainHeader>*/}
                        {/*<LatestPostBlock>*/}
                        {/*    <img src={circlesSrc} alt="" />*/}
                        {/*    <div>*/}
                        {/*        <h3>Mac Miller Circles</h3>*/}
                        {/*    </div>*/}
                        {/*</LatestPostBlock>*/}
                        <MainHeader>What's new in the crate</MainHeader>
                        <ArtistList>
                            {crateData.map(release => {
                                return (
                                    <li key={release.id}>
                                        <div className="image-wrapper">
                                            <img
                                                src={release.images[0].uri}
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
                                                {release.artists[0].name}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ArtistList>
                        <MainHeader>Who I've been listening to</MainHeader>
                        <ArtistList>
                            {artistData.map(artist => {
                                const imageToShow =
                                    artist.image.find(
                                        image => image.size === 'large'
                                    ) || artist.image[0];
                                const imageSrc = imageToShow['#text'];
                                return (
                                    <li key={artist.mbid}>
                                        <div className="image-wrapper">
                                            <img src={imageSrc} alt="" />
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
                            {albumData.map(album => {
                                const imageToShow =
                                    album.image.find(
                                        image => image.size === 'large'
                                    ) || album.image[0];
                                const imageSrc = imageToShow['#text'];
                                return (
                                    <li key={album.mbid}>
                                        <div className="image-wrapper">
                                            <img src={imageSrc} alt="" />
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
                </BodyWrapper>
            </MaxWidthContainer>
        </Layout>
    );
}

export const query = graphql`
    query MusicPageQuery {
        site {
            siteMetadata {
                lastFMApiKey
                discogsApiKey
            }
        }
    }
`;
