const Client = require('ftp-client');
const ftpEnv = require('./ftp.json');

const ftp = new Client({
    host: ftpEnv.host,
    port: ftpEnv.port,
    user: ftpEnv.user,
    password: ftpEnv.password
});

ftp.connect(() => {
    ftp.upload(ftpEnv.localTarget, ftpEnv.uploadPath, {
        overwrite: 'older'
    }, result => {
        console.log(result);
    })
});