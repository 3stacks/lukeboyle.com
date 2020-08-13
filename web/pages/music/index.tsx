import React from 'react';
import { initializeApollo } from '../../lib/apolloClient';
import { gql } from '@apollo/client';
import Head from 'next/head';
import Layout from '../../components/Layout';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { ArtistList, BodyWrapper, MainHeader } from '../../styled/music.style';
import { PAGES } from '../../constants';
import BlogPreview from '../../components/BlogPreview/BlogPreview';
import HomeHeadBanner from '../../components/HomeHeadBanner/HomeHeadBanner';

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
        };
    };
}

export default function Music({
    initialApolloState: {
        ROOT_QUERY: { musicPreviews }
    }
}: IProps) {
    // const [artistData, updateArtistData] = useState(prefetchedArtistData);
    // const [albumData, updateAlbumData] = useState(prefetchedAlbumData);
    // const [crateData, updateCrateData] = useState(prefetchedCrateData);

    // useEffect(() => {
    //     let isCancelled = false;
    //
    //     async function fetchData() {
    //         const LAST_FM_API_KEY = data.site.siteMetadata.lastFMApiKey;
    //         const DISCOGS_API_KEY = data.site.siteMetadata.discogsApiKey;
    //
    //         try {
    //             const albumResponse = await getTopAlbums(LAST_FM_API_KEY);
    //             const artistResponse = await getTopArtists(LAST_FM_API_KEY);
    //             const discogsResponse = await getDiscogsCollectionItems(
    //                 DISCOGS_API_KEY
    //             );
    //
    //             if (!isCancelled) {
    //                 updateArtistData(artistResponse);
    //                 updateAlbumData(albumResponse);
    //                 updateCrateData(discogsResponse);
    //             }
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //
    //     fetchData();
    //
    //     return () => (isCancelled = true);
    // }, []);

    return (
        <Layout
            slug="music"
            pageName={PAGES.MUSIC}
            headChildren={() => (
                <HomeHeadBanner hasColor>
                    <h1 className="site-name">Boyleing Point</h1>
                    <p>Psychotic ramblings about music</p>
                </HomeHeadBanner>
            )}
        >
            <Head>
                <title>Music | Luke Boyle</title>
            </Head>
            <MaxWidthContainer>
                <BodyWrapper>
                    <div className="left">
                        <MainHeader>What's new in the crate</MainHeader>
                        <ArtistList>
                            {/*{crateData.map(release => {*/}
                            {/*    return (*/}
                            {/*        <li key={release.id}>*/}
                            {/*            <div className="image-wrapper">*/}
                            {/*                <img*/}
                            {/*                    src={release.images[0].uri}*/}
                            {/*                    alt=""*/}
                            {/*                />*/}
                            {/*            </div>*/}
                            {/*            <div className="info-wrapper">*/}
                            {/*                <h2 className="artist-name">*/}
                            {/*                    {truncate(release.title, {*/}
                            {/*                        length: 20*/}
                            {/*                    })}*/}
                            {/*                </h2>*/}
                            {/*                <p className="play-count">*/}
                            {/*                    {release.artists[0].name}*/}
                            {/*                </p>*/}
                            {/*            </div>*/}
                            {/*        </li>*/}
                            {/*    );*/}
                            {/*})}*/}
                        </ArtistList>
                        <MainHeader>Who I've been listening to</MainHeader>
                        <ArtistList>
                            {/*{artistData.slice(0, 5).map(artist => {*/}
                            {/*    const imageToShow =*/}
                            {/*        artist.image.find(*/}
                            {/*            image => image.size === 'large'*/}
                            {/*        ) || artist.image[0];*/}
                            {/*    const imageSrc = imageToShow['#text'];*/}
                            {/*    return (*/}
                            {/*        <li key={artist.mbid}>*/}
                            {/*            <div className="image-wrapper">*/}
                            {/*                <img src={imageSrc} alt="" />*/}
                            {/*            </div>*/}
                            {/*            <div className="info-wrapper">*/}
                            {/*                <h2 className="artist-name">*/}
                            {/*                    {truncate(artist.name, {*/}
                            {/*                        length: 20*/}
                            {/*                    })}*/}
                            {/*                </h2>*/}
                            {/*                <p className="play-count">*/}
                            {/*                    {artist.playcount} plays*/}
                            {/*                </p>*/}
                            {/*            </div>*/}
                            {/*        </li>*/}
                            {/*    );*/}
                            {/*})}*/}
                        </ArtistList>
                        <MainHeader>My most played albums</MainHeader>
                        <ArtistList>
                            {/*{albumData.slice(0, 5).map(album => {*/}
                            {/*    const imageToShow =*/}
                            {/*        album.image.find(*/}
                            {/*            image => image.size === 'large'*/}
                            {/*        ) || album.image[0];*/}
                            {/*    const imageSrc = imageToShow['#text'];*/}
                            {/*    return (*/}
                            {/*        <li key={album.mbid || album.url}>*/}
                            {/*            <div className="image-wrapper">*/}
                            {/*                <img src={imageSrc} alt="" />*/}
                            {/*            </div>*/}
                            {/*            <div className="info-wrapper">*/}
                            {/*                <h2 className="artist-name">*/}
                            {/*                    {truncate(album.name, {*/}
                            {/*                        length: 20*/}
                            {/*                    })}*/}
                            {/*                </h2>*/}
                            {/*                <p className="play-count">*/}
                            {/*                    {album.playcount} plays*/}
                            {/*                </p>*/}
                            {/*            </div>*/}
                            {/*        </li>*/}
                            {/*    );*/}
                            {/*})}*/}
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
        </Layout>
    );
}

export const MUSIC_POSTS_QUERY = gql`
    query {
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
