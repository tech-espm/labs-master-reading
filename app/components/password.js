const User = require('../../services/sql/user');

const password = {
    async reset(req, res) {
        try {
            if (!req.query.hasOwnProperty('token') || req.query.token == '') return res.status(400).send('Empty token');
            console.log(req.query.token);

            let validate = await User.verifyToken(req.query.token);

            console.log(validate);

            if (!validate) return res.status(401).send('Token expired or nonexistent');
            else res.render('reset', { layout: 'layout' });
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
}

module.exports = password;