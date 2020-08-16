# portfolio-2016

## Tech implementation details

### UI

-   Next.js
-   Apollo Client

### Content server

-   Graphql
-   Apollo server

The Graphql server reads markdown files from `/blog-posts`, and `portfolio-items` and converts it into
digestible JSON on the fly.

## Getting started

### Dependencies

-   `yarn install`

### Development

-   run `yarn start` to start:
    -   the graphql server at `localhost:4000`
    -   the UI at `localhost:3000`

### Production builds

-   run `yarn build`
