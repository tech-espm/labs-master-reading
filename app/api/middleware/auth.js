const User = require('../../../services/sql/user');

const base64 = require('js-base64').Base64;

const auth = {
    async translateBasicAtuh(basicAuth) {
        let token = base64.decode(basicAuth.substr(6));
        let separator = token.indexOf(':');
        let login = token.substring(0, separator);
        let password = token.substring(separator + 1);

        return { login, password }
    },

    async login(req, res, next) {
        try {
            let { login, password } = await auth.translateBasicAtuh(req.headers.authorization);

            let user = await User.getUser(login, password);

            if (!user) return res.status(401).send('Unauthorized');

            let activeCookie = await User.signToken(user);
            res.cookie('session_cookie', activeCookie, { expires: new Date(Date.now() + 1800000) });
            res.cookie('id', user, { expires: new Date(Date.now() + 1800000) });

            next();
        } catch (err) {
            return res.status(500).send(err.message);
        }
    },

    async verify(req, res, next) {
        try {
            let validate = await User.verifyToken(req.cookies.session_cookie);

            if (!validate) return res.status(401).send('Session expired, please log in again');

            if (!req.cookies.id) return res.status(401).send('Session expired, please log in again');

            next();
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
}

module.exports = auth;