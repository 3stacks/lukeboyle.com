import AWS from 'aws-sdk';
import fs from 'fs';
import glob from 'glob';
import mimeTypes from 'mime-types';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3();

AWS.config = new AWS.Config({
	credentials: new AWS.Credentials({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	}),
	region: process.env.AWS_DEFAULT_REGION
});

glob('./public/**/*', {}, (err, files) => {
	console.log(`${files.length} files found`);

	files.forEach(file => {
		if (!fs.lstatSync(file).isDirectory()) {
			const fileContents = fs.readFileSync(`./${file}`);
			const fileMime = mimeTypes.lookup(file) || 'text/plain';

			s3.upload(
				{
					Bucket: 'lukeboyle.com',
					Key: file.replace('./public/', ''),
					Body: fileContents,
					ContentType: fileMime
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
