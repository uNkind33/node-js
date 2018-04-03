const User = require('../../models/user');
const passport = require('koa-passport');

// паспорт напрямую с базой не работает
passport.serializeUser(function(user, done) {
  done(null, user.email); 
});

passport.deserializeUser(function(email, done) {
  User.find({email: email}, done); // callback version checks id validity automatically
});
