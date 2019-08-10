const Strategy = require('passport-http-bearer').Strategy;
const passport = require('passport');
const User = require('../models/user');
const config = require('../config/config');
/**
 * 实现思路是传入token,通过token在MongoDB中找到user的信息
 * @param passport
 */
module.exports = function (passport) {
    passport.use(new Strategy(
        function (token,done) {
            User.findOne({
                token: token
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ))
};



