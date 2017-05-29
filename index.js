process.env.NODE_CONFIG_DIR = __dirname+ '/config';
const Promise = require('bluebird');
const config = require('config');
const app = require('./server/server');
const pg = require('pg');

// promisify pg

Promise.promisifyAll(pg);

const debug = require('debug')('node-backend-boilerplate:index');

var appPort = config.get('App.config.port');
// listen on port config.port
app.listen(appPort, () => {
	debug(`server started on port ${config.port} (${process.env.NODE_ENV})`);
});

module.exports = app;
