require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Luke Boyle | Front End Developer',
    lastFMApiKey: process.env.LAST_FM_API_KEY,
  	discogsApiKey: process.env.DISCOGS_TOKEN,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `images`,
            path: `${__dirname}/src/assets/img`,
        },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
        resolve: `gatsby-plugin-manifest`,
        options: {
            start_url: '/',
            background_color: '#34495e',
            theme_color: '#34495e',
            display: 'minimal-ui',
            icon: 'src/assets/img/android-icon-192x192.png', // This path is relative to the root of the site.
        },
    },
  ]
};
