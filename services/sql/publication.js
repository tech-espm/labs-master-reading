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
            .select('publication')
            .where('publication.id', id)
            .then((data) => {
                result = data;
            });

        return result
    },

    async createPublication(recommendation, master) {
        let result = '';

        await db('publication')
            .insert({
                master: master,
                recommendation: recommendation
            }).then((id) => {
                result = id;
            });

        await db('publication')
            .update({
                picture: `${result[0]}.jpg`
            })
            .where('id', result[0]);

        return result[0]
    }
}

module.exports = publication;