const db = require('../../config/mysql/connection');

const jwt = require('jsonwebtoken');

const user = {
    id: 1,
    user: process.env.SUPER_USER,
    pass: process.env.SUPER_PASS,

    async getUser(login, password) {
        let result = '';

        if (login != user.user && password != user.pass) result = false;
        else result = user.id;

        return result
    },

    async signToken(id) {
        let token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
            expiresIn: 1800
        });

        return token
    },

    async verifyToken(token) {
        let result = '';

        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err || !decoded) result = false;
            else result = true;
        });

        return result
    }
}

module.exports = user;