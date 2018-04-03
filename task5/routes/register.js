const passport = require('koa-passport');
const mongoose = require('../libs/mongoose');
const ObjectID = mongoose.Types.ObjectId;
const User = require('../models/user');

exports.get = async function(ctx, next) {
  if (ctx.isAuthenticated()) {
    ctx.body = ctx.render('welcome');
  } else {
    ctx.body = ctx.render('register');
  }
};

exports.post = async function(ctx, next) {
  console.log(ctx);
  try {
    await User.create(ctx.request.body);
    ctx.status = 200;
  } catch (err) {
      console.log(err);
      ctx.status = 500;
  }

  await passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
  })(ctx, next);
};
