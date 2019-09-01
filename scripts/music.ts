import dotenv from 'dotenv';
import fs from 'fs';
import {getTopArtists, getTopAlbums, getDiscogsCollectionItems} from './utils/music';

dotenv.config();

(async () => {
	try {
		const topArtistResponse = await getTopArtists(process.env.LAST_FM_API_KEY);

		fs.writeFileSync('./src/data/artists.json', JSON.stringify(topArtistResponse.slice(0, 8), null, '\t'));
	} catch (e) {
		console.error('Top artist fetching failed', e);
	}

	try {
		const topAlbumResponse = await getTopAlbums(process.env.LAST_FM_API_KEY);

		fs.writeFileSync('./src/data/albums.json', JSON.stringify(topAlbumResponse.slice(0, 12), null, '\t'));
	} catch (e) {
		console.error('Top album fetching failed', e);
	}

	try {
		const discogsCollectionResponse = await getDiscogsCollectionItems(process.env.DISCOGS_TOKEN);

		fs.writeFileSync('./src/data/crate.json', JSON.stringify(discogsCollectionResponse, null, '\t'));
	} catch (e) {
		console.error('crate data fetching failed', e);
	}
})();