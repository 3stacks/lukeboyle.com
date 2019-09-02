import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/layout/layout';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { MaxWidthContainer } from '../styled/utils';
import { bp } from '../styled/mixins';
import WIDTHS from '../styled/widths';
import {
    getDiscogsCollectionItems,
    getTopArtists,
    getTopAlbums
} from '../../scripts/utils/music';
import postData from '../data/music-posts.json';
import artistData from '../data/artists.json';
import albumData from '../data/albums.json';
import crateData from '../data/crate.json';

const ArtistList = styled.ol`
	list-style: none;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 20px;
	margin: 0;
	padding: 0;
	
	${bp(
        450,
        `
		grid-template-columns: 1fr 1fr;
	`
    )}
	
	${bp(
        700,
        `
		grid-template-columns: 1fr 1fr 1fr;
	`
    )}
	
	${bp(
        920,
        `
		grid-template-columns: 1fr 1fr 1fr 1fr;
	`
    )}
	
	li {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.image-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		
		img {
			max-width: 100%;
		}
	}
	
	.artist-name {
		font-size: 1.7rem;
		margin-bottom: 1rem;
		padding-top: 1rem;
		text-align: center;
	}
	
	.play-count {
		margin: 0;
		font-size: 1.6rem;
	}
`;

const MainHeader = styled.h2`
    text-align: center;
    font-size: 3rem;
    margin-bottom: 20px;
`;

export const BodyWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    padding-top: 60px;
    padding-bottom: 60px;

    div:last-of-type {
        max-width: 700px;
    }

    .left {
        align-self: start;
        padding: 0 20px 0 0;
        width: 100%;

        ${bp(
            WIDTHS.M,
            `
			max-width: 230px;
		`
        )}

        ${bp(
            1000,
            `
			position: sticky;
			top: -1px;
		`
        )}

		h2 {
            text-align: center;

            ${bp(
                1000,
                `
				text-align: left;
				font-size: 2.8rem;
			`
            )}

            ${bp(
                1027,
                `
				font-size: 3rem;
			`
            )}
        }
    }

    ${bp(
        WIDTHS.M,
        `
		grid-template-columns: 1fr 3fr;
	`
    )}

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: center;

        ${bp(
            1000,
            `
			text-align: left;
		`
        )}
    }

    li {
        font-size: 1.7rem;
        margin-bottom: 15px;
    }
`;

const SeeMoreOnBlock = styled.li`
    width: 100%;
`;

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

export default class Portfolio extends React.Component<IProps> {
    state = {
        artistData,
        albumData,
        crateData
    };

    componentDidMount = async () => {
        const LAST_FM_API_KEY = this.props.data.site.siteMetadata.lastFMApiKey;
        const DISCOGS_API_KEY = this.props.data.site.siteMetadata.discogsApiKey;

        try {
            const albumResponse = await getTopAlbums(LAST_FM_API_KEY);
            const artistResponse = await getTopArtists(LAST_FM_API_KEY);
            const discogsResponse = await getDiscogsCollectionItems(
                DISCOGS_API_KEY
            );

            this.setState(state => {
                return {
                    ...state,
                    artistData: artistResponse,
                    albumData: albumResponse,
                    crateData: discogsResponse
                };
            });
        } catch (e) {
            console.error(e);
        }
    };

    render() {
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
                            <MainHeader>What's new in the crate</MainHeader>
                            <ArtistList>
                                {this.state.crateData.map(release => {
                                    return (
                                        <li key={release.id}>
                                            <div className="image-wrapper">
                                                <img
                                                    src={release.images[0].uri}
                                                    alt=""
                                                />
                                            </div>
                                            <h2 className="artist-name">
                                                {release.title}
                                            </h2>
                                            <p className="play-count">
                                                {release.artists[0].name}
                                            </p>
                                        </li>
                                    );
                                })}
                                <SeeMoreOnBlock>
                                    <a
                                        href="https://www.discogs.com/user/LookBoil/collection?sort_by=added&sort_order=asc"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        See my collection on Discogs
                                    </a>
                                </SeeMoreOnBlock>
                            </ArtistList>
                            <MainHeader>Who I've been listening to</MainHeader>
                            <ArtistList>
                                {this.state.artistData.map(artist => {
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
                                            <h2 className="artist-name">
                                                {artist.name}
                                            </h2>
                                            <p className="play-count">
                                                {artist.playcount} plays
                                            </p>
                                        </li>
                                    );
                                })}
                            </ArtistList>
                            <MainHeader>My most played albums</MainHeader>
                            <ArtistList>
                                {this.state.albumData.map(album => {
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
                                            <h2 className="artist-name">
                                                {album.name}
                                            </h2>
                                            <p className="play-count">
                                                {album.playcount} plays
                                            </p>
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