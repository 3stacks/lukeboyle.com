import * as React from 'react';
import { initializeApollo } from '../../lib/apolloClient';
import { gql } from '@apollo/client';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { BodyWrapper, MainHeader } from '../../styled/music.style';
import HomeHeadBanner from '../../components/HomeHeadBanner/HomeHeadBanner';
import { META_DESCRIPTION, PAGES } from '../../constants';
import Layout from '../../components/Layout/Layout';
import BlogPreview from '../../components/BlogPreview/BlogPreview';
import PostArchive from '../../components/PostArchive';
import Pagination from '../../components/Pagination';
import { getPostArchiveFromBlogPosts } from '../../components/utils';
import Head from 'next/head';

export function getTotalPages(items: any[], pageLimit: number = 6): number {
    return Math.ceil(items.length / pageLimit);
}

const BlogPage = (props: {
    initialApolloState: { ROOT_QUERY: { blogPosts: any[] } };
}) => {
    const { blogPosts } = props.initialApolloState.ROOT_QUERY;

    if (!blogPosts) {
        return null;
    }

    const archiveData = React.useMemo(
        () => getPostArchiveFromBlogPosts(blogPosts),
        [blogPosts]
    );
    const pagePosts = blogPosts.slice(0, 6);
    const pageCount = React.useMemo(() => getTotalPages(blogPosts), [
        blogPosts
    ]);

    return (
        <Layout
            slug="blog"
            headChildren={() => (
                <HomeHeadBanner hasColor>
                    <h1 className="site-name">Boyleing Point</h1>
                    <p>Psychotic ramblings about technology</p>
                </HomeHeadBanner>
            )}
        >
            <Head>
                <title>Blog | Luke Boyle</title>
                <meta name="description" content={META_DESCRIPTION.BLOG} />
            </Head>
            <MaxWidthContainer>
                <BodyWrapper>
                    <div className="left">
                        <MainHeader>Post Archive</MainHeader>
                        <PostArchive data={archiveData} />
                    </div>
                    <div>
                        {pagePosts.map(post => {
                            return (
                                <BlogPreview
                                    key={post.path}
                                    author={post.metaData.post_author}
                                    publishDate={post.metaData.post_date}
                                    title={post.metaData.post_title}
                                    slug={`/${post.path.replace('.md', '')}`}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: post.snippet
                                        }}
                                    />
                                </BlogPreview>
                            );
                        })}
                        <Pagination pageNumber={0} pageCount={pageCount} />
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
            slug
            snippet
            metaData {
                post_title
                post_date
                post_author
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
