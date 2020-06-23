const formidable = require('formidable'),
    fs = require('fs');

const upload = {
    uploadFile(req, res) {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            let originalPath = files.fileToUpload.path,
                path = `${__dirname}/../../../web/public/assets/images/profile/${files.fileToUpload.name}`;
            fs.rename(originalPath, path, (err) => {
                if (err) return res.status(500).send(err);
                res.status(200).send('ok');
            });
        });
    }
}

module.exports = upload;