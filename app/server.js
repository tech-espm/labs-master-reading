const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    server = express(),
    version = require('../package.json').version;

const homePage = require('./components/home');

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
        server.use((req, res, next) => {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            next();
        });
    },

    sets() {
        server.set('views', path.join(`${__dirname}/../web/view`));
        server.engine('html', require('ejs').renderFile);
        server.set('view engine', 'html');
    },

    routes() {
        server.all('/', homePage);

        server.all('/api/ping', (req, res) => res.status(200).send('pong'));
        server.all('/api/version', (req, res) => res.status(200).send(version));
        
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