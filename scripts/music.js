const axios = require('axios');
require('dotenv').config();
const fs = require('fs');

axios.get(
	`http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&period=3month&user=lookboil&api_key=${process.env.LAST_FM_API_KEY}&format=json`
).then(response => {
	fs.writeFileSync('./src/data/artists.json', JSON.stringify(response.data.topartists.artist.slice(0, 8), null, '\t'));
});

axios.get(
	`http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=lookboil&api_key=${process.env.LAST_FM_API_KEY}&format=json`
).then(response => {
	fs.writeFileSync('./src/data/albums.json', JSON.stringify(response.data.topalbums.album.slice(0, 12), null, '\t'));
});

function sleep(time) {
	return new Promise(resolve => {
		setTimeout(resolve, time);
	});
}

axios.get(`https://api.discogs.com/users/lookboil/collection/folders/0/releases?sort=added&sort_order=desc`).then(response => {
	const releaseIds = response.data.releases.map(release => release.id);
	const releases = releaseIds.slice(0, 3).map(async (releaseId) => {
		try {
			await sleep(2000);
			const response = await axios.get(`https://api.discogs.com/releases/${releaseId}?token=${process.env.DISCOGS_TOKEN}`);
			return response.data;
		} catch (e) {
			console.error(e)
		}
	});

	Promise.all(releases).then((values) => {
		fs.writeFileSync('./src/data/crate.json', JSON.stringify(values, null, '\t'));
	});
});