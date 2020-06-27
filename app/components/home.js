const home = {
    index(req, res) {
        res.render('home/index', { layout: 'layout' });
    },

    upload(req, res) {
        res.render('home/upload', { layout: 'layout' });
    },

    register(req, res) {
        res.render('home/register', { layout: 'layout' });
    },

    login(req, res) {
        res.render('home/login', { layout: 'layout' });
    },

    admin(req, res) {
        res.render('home/dashboard', { layout: 'layout'});
    }
}

module.exports = home;