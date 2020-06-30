const db = require('../../../services/sql/publication');

const formidable = require('formidable'),
    fs = require('fs');

const publication = {
    async getAll(req, res) {
        let publications = await db.getAllPublications();

        res.status(200).send(publications);
    },

    async getPublication(req, res) {
        try {
            if (!req.body.hasOwnProperty('id') || req.body.id == '') return res.status(400).send('Empty id');

            let publication = await db.getPublication(req.body.id);

            res.status(200).send(publication);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async createPublication(req, res) {
        try {
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                let result = await db.createPublication(fields.recommendation, fields.master);
                let originalPath = files.fileToUpload.path,
                    path = `${__base}/web/public/assets/images/profile/${result}.jpg`;
                fs.rename(originalPath, path, async (err) => {
                    if (err) return res.status(500).send(err);

                    res.status(200).send('ok');
                });
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = publication;
