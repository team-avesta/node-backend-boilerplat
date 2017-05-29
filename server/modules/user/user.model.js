const Promise = require('bluebird');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
const pgClient = require('../../helpers/db');



/**
 * @swagger
 * definition:
 *   NewUser:
 *       type: object
 *       required: [login_id,first_name,last_name,role_id]
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         role_id:
 *           type: integer
 *   User:
 *      allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - user_id
 *       - properties:
 *          user_id:
 *             type: integer
 *   UserList:
 *      allOf:
 *       - $ref: '#/definitions/User'
 *       - properties:
 *          totalCount:
 *             type: integer
 */


const User = {};

/**
 * Check user availibility by login id
 * @param {string} loginId - User's login id.
 * @returns {Promise<User,Error>}
 */
User.loginCheck = function(loginId) {
    let query = "SELECT first_name,last_name,is_first_time_login FROM users WHERE login_id= $1";
    let values = [loginId];

    return pgClient.query(query, values)
        .then(result => {
            if (result.rows.length > 0) {
                return result.rows;
            } else {
                const err = new APIError('No users found!', httpStatus.OK, true);
                return Promise.reject(err);
            }
        })
        .error(err => Promise.reject(err));

};


/**
 * List users in ascending order of usre id.
 * @param {number} limit - Limit number of users to be returned.
 * @param {number} skip - Number of users to be skipped.
 * @returns {Promise<User[],Error>}
 */
User.list = function(limit, offset) {

    let query = "SELECT * FROM users";
    let values = [];

    if (limit && offset) {
        query = "SELECT count(*) over() as totalCount, *  FROM users order by user_id limit $1 offset $2 ";
        values = [limit, offset];
    }

    return pgClient.query(query, values)
        .then(result => result.rows)
        .error(err => Promise.reject(err));
};


module.exports = User;
