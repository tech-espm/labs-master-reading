const home = {
    index(req, res) {
        res.render('home/index', { layout: 'layout' });
    }
}

module.exports = home;