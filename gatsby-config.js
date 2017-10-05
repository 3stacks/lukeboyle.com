module.exports = {
  siteMetadata: {
    title: 'Luke Boyle | Front End Developer',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-84326776-1',
      },
    },
    'gatsby-plugin-offline'
  ]
};
