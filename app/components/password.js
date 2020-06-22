const password = {
    reset(req, res) {
        try {
            if (!req.query.hasOwnProperty('token') || req.query.token == '') return res.status(400).send('Empty token');

            res.render('reset', { layout: 'layout' });
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
}

module.exports = password;