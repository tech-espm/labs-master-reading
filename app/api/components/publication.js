const db = require('../../../services/sql/publication');

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
            if (!req.body.hasOwnProperty('recommendation') || req.body.recommendation == '') return res.status(400).send('Empty recommendation');

            let publicationCreated = await db.createPublication(req.body.recommendation, req.cookies.id);

            res.status(201).send(publicationCreated);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = publication;