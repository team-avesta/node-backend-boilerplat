const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pgClient = require('./db');


passport.use(new LocalStrategy({
    usernameField: 'login_id',
    passwordField: 'password',
    passReqToCallback: true
}, (req, login_id, password, done) => {
    pgClient.query("SELECT * FROM users WHERE login_id= $1", [login_id])
        .then(result => {

            if (result.rows.length > 0) {
                let user = result.rows[0];
                let isMatch = bcrypt.compareSync(password, user.password);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Incorrect Password.'
                    });
                }
            } else {
                return done(null, false, {
                    message: 'User does not exits.'
                });
            }
        })
        .error(e => {
            return done(null, false, {
                message: 'User does not exits.'
            });
        });
}));

passport.serializeUser((user, done) => {
    done(null, user.login_id);
});

passport.deserializeUser((login_id, done) => {

    let query = "SELECT * FROM users WHERE login_id=$1 ";
    let values = [login_id];

    pgClient.query(query, values)
        .then(user => {
            if (user.rows.length > 0) {
                return done(null, user.rows[0]);
            } else {
                return done(null, false, {
                    message: 'User does not exits.'
                });
            }
        })
        .error(e => {
            return done(null, false, {
                message: 'User does not exits.'
            });
        });

});



passport.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {

        return next();
    }
    var retVal = {
        Success: false,
        message: "Sorry,You are not Authorized.!"
    };
    res.send(retVal);
};

module.exports = passport;
