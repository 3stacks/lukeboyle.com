const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');
const glob = require('glob');

glob('./public/**/*', {}, (err, files) => {
	files.forEach(file => {
		if (!fs.lstatSync(file).isDirectory()) {
			const fileContents = fs.readFileSync(`./${file}`);

			s3.upload(
				{
					Bucket: 'lukeboyle.com',
					Key: file.replace('./public/', ''),
					Body: fileContents
				},
				{partSize: 10 * 1024 * 1024, queueSize: 1},
				(err, data) => {
					if (err) {
						console.error(err);
					}

					console.log(data);
				}
			);
		}
	});
});