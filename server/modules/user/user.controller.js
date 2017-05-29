const pgClient = require('../../helpers/db');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
const User = require('./user.model');


function list(req, res, next) {

    User.list(req.query.limit, req.query.offset)
        .then((result) => {
            res.json(result);
        })
        .error((err) => next(err));
}

function loginCheck(req, res, next) {

    User.loginCheck(req.query.login_id)
        .then((result) => {
            res.json(result);
        })
        .error((err) => next(err));
}


module.exports = {
    list,
    loginCheck
};
