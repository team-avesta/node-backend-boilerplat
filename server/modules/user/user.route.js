const express = require('express');
const validate = require('express-validation');
const passport = require('../../helpers/passport');
const paramValidation = require('./user.validation');
const userCtrl = require('./user.controller');

const router = express.Router();


router.route('/loginCheck').get(validate(paramValidation.loginCheck),userCtrl.loginCheck);
router.route('/getUser').get(passport.isLoggedIn,userCtrl.list);
module.exports = router;
