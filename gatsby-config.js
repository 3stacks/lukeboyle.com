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
				name: 'Luke Boyle - Front End Developer',
				short_name: 'Luke Boyle',
				start_url: '/',
				background_color: '#ffe01b',
				theme_color: '#ffe01b',
				display: 'minimal-ui',
				icon: 'src/assets/img/android-icon-192x192.png' // This path is relative to the root of the site.
			}
		}
	]
};
