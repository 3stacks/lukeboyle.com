import * as React from 'react';
import PostList, {
    ALL_POSTS_QUERY,
    allPostsQueryVars
} from '../components/PostList';
import { initializeApollo } from '../lib/apolloClient';
import { gql, useQuery, NetworkStatus } from '@apollo/client';

const BlogPage = () => <p>asdf</p>;

export const ALL_POSTS_QUERY = gql`
    query {
        blogPosts {
            component
        }
    }
`;

export async function getStaticProps() {
    const apolloClient = initializeApollo();

    const data = await apolloClient.query({
        query: ALL_POSTS_QUERY
    });

    console.log(data);

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 1
    };
}

export default BlogPage;
