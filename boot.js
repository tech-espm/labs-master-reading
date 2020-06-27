global.__base = __dirname;
require('dotenv').config();
require(`${__dirname}/config/mysql/connection.js`);
require(`${__dirname}/app/server`);