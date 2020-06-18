const User = require('../../../services/sql/user');

const auth = {
    async login(req, res, next) {
        try {
            if (!req.body.hasOwnProperty('login') || req.body.login == '') return res.status(400).send('Empty login');
            if (!req.body.hasOwnProperty('password') || req.body.password == '') return res.status(400).send('Empty password');

            let user = await User.getUser(req.body.login, req.body.password);
            
            if (!user) return res.status(401).send('Unauthorized');

            let activeCookie = await User.signToken(user.id);
            console.log(activeCookie);
            res.cookie('session_cookie', activeCookie, { expires: new Date(Date.now() + 1800000) });
            
            next();
        } catch (err) {
            return res.status(500).send(err.message);
        }
    },

    async verify(req, res, next) {
        try {
            let validate = await User.verifyToken(req.cookies.session_cookie);

            if (!validate) return res.status(401).send('Session expired, please log in again');

            next();
        } catch (err) {
            return res.status(500).send(err.message);
        }
    },

    async register(req, res) {
        try {
            if (!req.body.hasOwnProperty('name') || req.body.name == '') return res.status(400).send('Empty name');
            if (!req.body.hasOwnProperty('login') || req.body.login == '') return res.status(400).send('Empty login');
            if (!req.body.hasOwnProperty('password') || req.body.password == '') return res.status(400).send('Empty password');

            let user = await sql.createUser(req.body);

            return res.status(201).send(user);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
}

module.exports = auth;