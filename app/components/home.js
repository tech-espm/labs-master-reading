const home = {
    index(req, res) {
        res.render('home/index', { layout: 'layout' });
    },

    upload(req, res) {
        res.render('home/upload', { layout: 'layout' });
    }
}

module.exports = home;