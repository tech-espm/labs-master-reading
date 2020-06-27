const home = {
    index(req, res) {
        res.render('home/index', { layout: 'layout' });
    },

    upload(req, res) {
        res.render('home/upload', { layout: 'layout' });
    },

    admin(req, res) {
        res.render('home/dashboard', { layout: 'layout'});
    }
}

module.exports = home;