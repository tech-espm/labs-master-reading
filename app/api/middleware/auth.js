const User = require('../../../services/sql/user');
const { reset } = require('nodemon');

const base64 = require('js-base64').Base64,
    nodemailer = require('nodemailer');

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

            let activeCookie = await User.signToken(user.id);
            res.cookie('session_cookie', activeCookie, { expires: new Date(Date.now() + 1800000) });
            res.cookie('id', user.id, { expires: new Date(Date.now() + 1800000) });

            next();
        } catch (err) {
            return res.status(500).send(err.message);
        }
    },

    async verify(req, res, next) {
        try {
            let validate = await User.verifyToken(req.cookies.session_cookie);

            if (!validate) return res.status(401).send('Session expired, please log in again');

            if (req.cookies.id) return res.status(401).send('Session expired, please log in again');

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

            let user = await User.createUser(req.body);

            return res.status(201).send(user);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    },

    async forgot(req, res) {
        try {
            if (!req.body.hasOwnProperty('login') || req.body.login == '') return res.status(400).send('Empty login');

            let id = await User.getId(req.body.login);
            let token = await User.signToken(id, true);
            console.log(id);
            console.log(token);

            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            await transporter.sendMail({
                from: `"Leitura de Mestre" <${process.env.EMAIL_USER}>`,
                to: req.body.login,
                subject: 'Master Reading - Reset your password',
                text: `Access this link to be able to reset your password: http://${process.env.MR_HOST}:${process.env.MR_PORT}/reset?token=${token}`
            }).then((result) => {
                res.status(200).send(result);
            }).catch((err) => {
                res.status(500).send(err);
            });
        } catch (err) {
            return res.status(500).send(err.message);
        }
    },

    async changePass(req, res) {
        try {
            if (!req.body.hasOwnProperty('password') || req.body.password == '') return res.status(400).send('Empty password');

            let tokenIndex = req.headers.referer.indexOf('=') + 1,
                token = req.headers.referer.substr(tokenIndex),
                decodedId = await User.decodeToken(token);

            await User.changePassword(decodedId.id[0].id, req.body.password);

            res.status(200).send('Password successfully reset');
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
}

module.exports = auth;