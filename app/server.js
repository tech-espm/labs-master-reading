const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    server = express(),
    version = require('../package.json').version;

const auth = require('./api/middleware/auth');

const homePage = require('./components/home'),
    publicationData = require('./api/components/publication');

const Server = {
    port: process.env.MR_PORT,

    uses() {
        server.use(cookieParser());
        server.use(express.static(path.join(`${__dirname}/../web/public`), {
            cacheControl: true,
            etag: false,
            maxAge: '30d'
        }));
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));
        server.use(require('express-ejs-layouts'));
        server.use((req, res, next) => {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            next();
        });
    },

    sets() {
        server.set('views', path.join(`${__dirname}/../web/view`));
        server.set('view engine', 'ejs');
    },

    routes() {
        server.all('/', homePage.index);
        server.get('/admin', homePage.admin);
        server.get('/register', homePage.register);
        server.get('/login', homePage.login);
        server.get('/publicacao/criar', homePage.create);
        server.get('/publicacao/ordenar', homePage.order);
        server.get('/publicacao/gerenciar', homePage.manage);

        server.all('/api/ping', (req, res) => res.status(200).send('pong'));
        server.all('/api/version', (req, res) => res.status(200).send(version));
        server.post('/api/login', auth.login, (req, res) => res.status(200).send('ok'));
        server.get('/api/publication/getAll', publicationData.getAll);
        server.get('/api/publication/get', publicationData.getPublication);
        server.post('/api/publication/create', auth.verify, publicationData.createPublication);
        server.post('/api/publication/create', publicationData.createPublication);
        
        server.use((req, res) => {
            res.status(404).send('Página não encontrada');
        });
    },

    listen() {
        Server.uses();
        Server.routes();
        Server.sets();
        server.listen(Server.port || 8000);
    }
}

module.export = Server.listen();