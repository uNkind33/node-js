const koa = require('koa');
const Router = require('koa-router');
const parser = require('koa-bodyparser');
const serve = require('koa-static');
const events = require('events');

const emmitter = new events.EventEmitter();
const app = new koa();

const router = new Router();

router.post('/publish', parser(), function (ctx, next) {
    emmitter.emit('message', ctx.request.body.message);
    ctx.response.set('Content-Type', 'text/plain;charset=utf-8');
    ctx.body = 'ok';
});

router.get('/subscribe', async function (ctx, next) {
    ctx.response.set('Content-Type', 'text/plain;charset=utf-8');
    ctx.response.set('Cache-Control', 'no-cache, must-revalidate');

    const result = await new Promise((resolve, reject) => {
        emmitter.once('message', message => {
            resolve(message);
        });
        emmitter.on('error', message => {
            reject('error');
        });
    });

    ctx.body = result;
    
});

app.use(router.routes())
app.use(router.allowedMethods());
app.use(serve('./public'));


app.listen(3000);