require('dotenv').config();
const fs = require('fs');
const {getTopAlbums, getTopArtists, getDiscogsCollectionItems} = require('./utils/music');

(async () => {
	const topArtistResponse = await getTopArtists(process.env.LAST_FM_API_KEY);

	fs.writeFileSync('./src/data/artists.json', JSON.stringify(topArtistResponse.data.topartists.artist.slice(0, 8), null, '\t'));

	const topAlbumResponse = await getTopAlbums(process.env.LAST_FM_API_KEY);

	fs.writeFileSync('./src/data/albums.json', JSON.stringify(topAlbumResponse.data.topalbums.album.slice(0, 12), null, '\t'));

	const discogsCollectionResponse = await getDiscogsCollectionItems(process.env.DISCOGS_TOKEN);

	fs.writeFileSync('./src/data/crate.json', JSON.stringify(discogsCollectionResponse, null, '\t'));
})();