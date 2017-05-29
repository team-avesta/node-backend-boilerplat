const Joi = require('joi');

module.exports = {
    // GET /user/loginCheck
    loginCheck: {
        query: {
            login_id: Joi.string().required()
        }
    },

    // POST /user/login
    login: {
        body: {
            login_id: Joi.string().required(),
            password: Joi.string().required()
        }
    },

    // POST /user/updateUser
    updateUser: {
        body: {
            user_id: Joi.number().integer().required()
        }
    },

    // DELETE /user/deleteUser
    deleteUser: {
        query: {
            user_id: Joi.number().integer().required()
        }
    },

    // PUT /user/resetPassword
    resetPassword: {
        body: {
            user_id: Joi.number().integer().required()
        }
    },

    // PUT /user/changePassword
    changePassword: {
        body: {
            login_id: Joi.string().required(),
            newPass: Joi.string().required(),
            is_first_time_login: Joi.boolean()
        }
    },

    // POST /user/logout
    logout: {
        body: {
            user_id: Joi.number().integer().required()
        }
    }
};
