const db = require('../../../services/sql/master');

const master = {
    async getAll(req, res) {
        let masters = await db.getAllMasters();

        res.status(200).send(masters);
    },

    async getMaster(req, res) {
        try {
            if (!req.body.hasOwnProperty('firstName') || req.body.firstName == '') return res.status(400).send('Empty firstName');
            if (!req.body.hasOwnProperty('lastName') || req.body.lastName == '') return res.status(400).send('Empty lastName');

            let master = await db.getMaster(req.body.firstName, req.body.lastName);

            res.status(200).send(master);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async createMaster(req, res) {
        try {
            if (!req.body.hasOwnProperty('firstName') || req.body.firstName == '') return res.status(400).send('Empty firstName');
            if (!req.body.hasOwnProperty('lastName') || req.body.lastName == '') return res.status(400).send('Empty lastName');
            if (!req.body.hasOwnProperty('recommendation') || req.body.recommendation == '') return res.status(400).send('Empty recommendation');

            let masterCreated = await db.createMaster(req.body);

            res.status(201).send(masterCreated);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = master;