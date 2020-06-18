const db = require('../../config/mysql/connection');

const publication = {
    async getAllPublications() {
        let result = '';

        await db('publication')
            .select('*')
            .then((data) => {
                result = data;
            });

        return result
    },

    async getPublication(id) {
        let result = '';

        await db('publication')
            .select('publication.*', 'user.name')
            .where('publication.id', id)
            .leftJoin('user', 'user.id', 'publication.user_id')
            .then((data) => {
                result = data;
            });

        return result
    },

    async createPublication(recommendation, user_id) {
        let result = '';

        await db('publication')
            .insert({
                user_id: user_id,
                recommendation: recommendation
            }).then((id) => {
                result = id;
            });

        await db('publication')
            .update({
                picture: `${result[0]}.jpg`
            })
            .where('id', result[0])
            .then(() => {
                result = 'Created';
            });

        return result
    }
}

module.exports = publication;