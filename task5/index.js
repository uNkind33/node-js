// A "closer to real-life" app example
// using 3rd party middleware modules
// P.S. MWs calls be refactored in many files

// long stack trace (+clarify from co) if needed
if (process.env.TRACE) {
  require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();

const config = require('config');
const mongoose = require('./libs/mongoose');
const ObjectID = mongoose.Types.ObjectId;
const User = require('./models/user');

const path = require('path');
const fs = require('fs');

const handlers = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

handlers.forEach(handler => require('./middlewares/' + handler).init(app));

const Router = require('koa-router');
const router = new Router();

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/test');

router.get('/register', require('./routes/register').get);
router.get('/', require('./routes/frontpage').get);
router.post('/register', require('./routes/register').post);
router.post('/login', require('./routes/login').post);
router.post('/logout', require('./routes/logout').post);

app.use(router.routes());

app.listen(3000);
