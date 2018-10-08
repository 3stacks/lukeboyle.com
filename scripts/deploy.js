const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');
const glob = require('glob');
require('dotenv').config();

AWS.config = new AWS.Config({
	credentials: new AWS.Credentials({
		accessKeyId: process.env.AWS_KEYID,
		secretAccessKey: process.env.AWS_SECRET,
	}),
	region: 'ap-southeast-2'
});

console.log(new AWS.Credentials({
	accessKeyId: process.env.AWS_KEYID,
	secretAccessKey: process.env.AWS_SECRET,
});

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
						throw new Error(err.message);
					}

					console.log(data);
				}
			);
		}
	});
});