exports.get = async function(ctx, next) {
  if (ctx.isAuthenticated()) {
    // ctx.state.user;
    ctx.body = ctx.render('welcome');
  } else {
    ctx.body = ctx.render('login');
  }

};
