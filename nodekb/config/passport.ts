const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = (passport: any) => {
    passport.use(new LocalStrategy((username: any, password: any, done: any)=> {
        User.findOne({
            email: username
        }, (err: any, user: any)=> {
            if(err) {
                throw(err);
            }
            if(!user) {
                return done(null, false, {message: 'No user found'});
            }
            bcrypt.compare(password, user.password, (err: any, isMach: Boolean) => {
                if (err){
                    throw err;
                }
                if(isMach) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Wrong password'});
                }
            });
        });
    }));

    passport.serializeUser(function(user: any, done: any) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id: any, done: any) {
        User.findById(id, function(err: any, user: any) {
          done(err, user);
        });
      });
};