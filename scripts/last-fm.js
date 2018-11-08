const axios = require('axios');
require('dotenv').config();
const fs = require('fs');

axios.get(
	`http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&period=3month&user=lookboil&api_key=${process.env.LAST_FM_API_KEY}&format=json`
).then(response => {
	fs.writeFileSync('./src/data/artists.json', JSON.stringify(response.data.topartists.artist.slice(0, 12), null, '\t'));
});

axios.get(
	`http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=lookboil&api_key=${process.env.LAST_FM_API_KEY}&format=json`
).then(response => {
	console.log(response.data);
	fs.writeFileSync('./src/data/albums.json', JSON.stringify(response.data.topalbums.album.slice(0, 12), null, '\t'));
});