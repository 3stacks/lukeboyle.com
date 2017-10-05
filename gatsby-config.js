module.exports = {
  siteMetadata: {
    title: 'Luke Boyle | Front End Developer',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-purify-css',
      options: {
        purifyOptions: {
          minify: true
        }
      }
    }
  ],
};