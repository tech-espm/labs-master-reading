const db = require('../../config/mysql/connection');

const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

const user = {
    async getUser(login, password) {
        let result = '';

        await db('user')
            .select('*')
            .where({
                login: login
            })
            .then(async (data) => {
                await bcrypt.compare(password, data[0].password).then(same => {
                    if (same) result = data[0];
                })
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

    async signToken(id) {
        let token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
            expiresIn: 1800 
        });

        return token
    },

    async verifyToken(token) {
        let result = '';

        await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err || !decoded) result = false;
            result = true;
        });

        return result
    }
}

module.exports = user;