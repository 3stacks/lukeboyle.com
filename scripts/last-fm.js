const axios = require('axios');
require('dotenv').config();
const fs = require('fs');

axios.get(
	`http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&period=3month&user=lookboil&api_key=${process.env.LAST_FM_API_KEY}&format=json`
).then(response => {
	fs.writeFileSync('./src/data/artists.json', JSON.stringify(response.data.topartists.artist.slice(0, 12), null, '\t'));
});