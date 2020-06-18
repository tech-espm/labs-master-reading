const db = require('../../config/mysql/connection');

const master = {
    async getAllMasters() {
        let result = '';

        await db('master')
            .select('*')
            .then((data) => {
                result = data;
            });

        return result
    },

    async getMaster(firstName, lastName) {
        let result = '';

        await db('master')
            .select('*')
            .where({
                first_name: firstName,
                last_name: lastName
            })
            .then((data) => {
                result = data;
            });

        return result
    },

    async createMaster(body) {
        let result = '';

        await db('master')
            .insert({
                first_name: body.firstName,
                last_name: body.lastName,
                recommendation: body.recommendation
            });

        result = await master.getMaster(body.firstName, body.lastName);

        await db('master')
            .update({
                picture: `${result[0].id}.jpg`
            })
            .where({
                id: result[0].id
            })
            .then(() => {
                result = 'Created';
            });

        return result
    }
}

module.exports = master;