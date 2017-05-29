const config = require('config');
const pg = require('pg');
pg.defaults.poolSize = 100;

const connectionString = config.get('App.config.db');
module.exports = {
    query: function(text, values) {

        return pg.connectAsync(connectionString).then(function(client) {

            return client.queryAsync(text, values)
                .then((result) => {
                    if (result) {
                        return Promise.resolve(result);
                    }
                    return Promise.reject(result);
                })
                .error((e) => {
                    return Promise.reject(e);
                })
                .finally(function() {
                    client.release();
                });
        }).error((e) => {
            return Promise.reject(e)
        });
    },

    transaction: function() {
        return pg.connectAsync(connectionString).then(client => {
            return client.queryAsync('BEGIN').then((result) => {
                if (result) {
                    return Promise.resolve(client);
                }
                return Promise.reject(result);
            }).error((err) => {
                return Promise.reject(err);
            });
        });
    },

    rollback: function(client) {
        return client.queryAsync('ROLLBACK')
            .then((result) => {
                client.release();
                return result;
            })
            .error((e) => {
                client.release();
                return Promise.reject(e);
            })
    },

    tranQuery: function(text, values, client) {
        return client.queryAsync(text, values)
            .then((result) => {
                if (result) {
                    return Promise.resolve(result);
                }
                return Promise.reject(result);
            })
            .error((e) => {
                return Promise.reject(e);
            })
    }
}
