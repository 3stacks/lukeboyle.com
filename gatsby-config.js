require('dotenv').config();

module.exports = {
	siteMetadata: {
		siteUrl: 'https://lukeboyle.com',
		title: 'Luke Boyle | Front End Developer',
		lastFMApiKey: process.env.LAST_FM_API_KEY,
		discogsApiKey: process.env.DISCOGS_TOKEN
	},
	plugins: [
		'gatsby-plugin-typescript',
		'gatsby-plugin-sitemap',
		'gatsby-plugin-styled-components',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-offline',
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/assets/img`
			}
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				start_url: '/',
				background_color: '#3b02a8',
				theme_color: '#3b02a8',
				display: 'minimal-ui',
				icon: 'src/assets/img/android-icon-192x192.png' // This path is relative to the root of the site.
			}
		}
	]
};
