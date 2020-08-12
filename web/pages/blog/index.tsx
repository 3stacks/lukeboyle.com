import * as React from 'react';
import { initializeApollo } from '../../lib/apolloClient';
import { gql } from '@apollo/client';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { BodyWrapper, MainHeader } from '../../styled/music.style';
import HomeHeadBanner from '../../components/HomeHeadBanner/HomeHeadBanner';
import { PAGES } from '../../constants';
import Layout from '../../components/Layout/Layout';
import BlogPreview from '../../components/BlogPreview/BlogPreview';

const BlogPage = props => {
    console.log(props);
    if (!props.initialApolloState.ROOT_QUERY.blogPosts) {
        return null;
    }

    const pagePosts = props.initialApolloState.ROOT_QUERY.blogPosts.slice(0, 6);

    return (
        <Layout
            slug="blog"
            pageName={PAGES.BLOG}
            headChildren={() => (
                <HomeHeadBanner hasColor>
                    <h1 className="site-name">Boyleing Point</h1>
                    <p>Psychotic ramblings about technology</p>
                </HomeHeadBanner>
            )}
        >
            <MaxWidthContainer>
                <BodyWrapper>
                    <div className="left">
                        <MainHeader>Post Archive</MainHeader>
                    </div>
                    <div>
                        {pagePosts.map(post => {
                            console.log(post);
                            return (
                                <BlogPreview
                                    publishDate={post.metaData.post_date}
                                    title={post.metaData.post_title}
                                    slug={`/${post.path.replace('.md', '')}`}
                                >
                                    asdf
                                </BlogPreview>
                            );
                        })}
                    </div>
                </BodyWrapper>
            </MaxWidthContainer>
        </Layout>
    );
};

export const ALL_POSTS_QUERY = gql`
    query {
        blogPosts {
            path

            metaData {
                post_title
                post_date
            }
        }
    }
`;

export async function getStaticProps() {
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: ALL_POSTS_QUERY
    });

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 1
    };
}

export default BlogPage;
