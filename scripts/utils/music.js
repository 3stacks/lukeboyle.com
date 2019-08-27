const axios = require('axios');

async function getTopAlbums(apiKey) {
	return axios.get(
		`http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&limit=8&period=1month&user=lookboil&api_key=${apiKey}&format=json`
	);
}

async function getTopArtists(apiKey) {
	return axios.get(
		`http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&limit=12&user=lookboil&api_key=${apiKey}&format=json`
	);
}

function sleep(time) {
	return new Promise(resolve => {
		setTimeout(resolve, time);
	});
}

async function getDiscogsCollectionItems(apiKey) {
	const collectionResponse = await axios.get(`https://api.discogs.com/users/lookboil/collection/folders/0/releases?sort=added&sort_order=desc`);
	const releaseIds = collectionResponse.data.releases.map(release => release.id);
	const releases = releaseIds.slice(0, 3).map(async (releaseId) => {
		try {
			await sleep(2000);
			const response = await axios.get(`https://api.discogs.com/releases/${releaseId}?token=${apiKey}`);
			return response.data;
		} catch (e) {
			console.error(e)
		}
	});

	return Promise.all(releases);
}

module.exports = {
	getDiscogsCollectionItems,
	getTopArtists,
	getTopAlbums
};