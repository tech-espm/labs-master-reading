const db = require('../../config/mysql/connection');

const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

const user = {
    async getUser(login, password) {
        let result = '';

        await db('user')
            .select('*')
            .where('login', login)
            .then(async (data) => {
                await bcrypt.compare(password, data[0].password).then(same => {
                    if (same) result = data[0];
                })
            });

        return result
    },

    async getId(login) {
        let result = '';

        await db('user')
            .select('id')
            .where('login', login)
            .then((data) => {
                result = data
            });

        return result
    },

    async createUser(body) {
        let result = '';

        bcrypt.hash(body.password, 10, async (err, hash) => {
            if (err) return err

            await db('user')
                .insert({
                    name: body.name,
                    login: body.login,
                    password: hash,
                    type: 0
                })
                .then(() => {
                    result = 'Created';
                });
        });

        return result
    },

    async changePassword(id, password) {
        let result = '';

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) return err

            await db('user')
                .update({
                    password: hash
                })
                .where('id', id)
                .then(() => {
                    result = 'Password changed';
                });
        });

        return result
    },

    async signToken(id, forgot = false) {
        let ei = 1800;

        if (forgot) ei = 300;

        let token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
            expiresIn: ei
        });

        return token
    },

    async verifyToken(token) {
        let result = '';

        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err || !decoded) result = false;
            result = true;
        });

        return result
    },

    async decodeToken(token) {
        let result = '';

        result = jwt.decode(token);

        return result
    }
}

module.exports = user;