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
    },
    create(req, res) {
        res.render('publication/create', { layout: 'layout'});
    },
    order(req, res) {
        res.render('publication/order', { layout: 'layout'});
    },
    manage(req, res) {
        res.render('publication/manage', { layout: 'layout'});
    }

    
}

module.exports = home;