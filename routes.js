
const Router = require('@koa/router');
const { update, write, read } = require('./messages')

const router = new Router();

router.get('/stats', (ctx, next) => {
  const stats = read()
  ctx.status = 200
  ctx.body = stats
});

router.post('/message', (ctx, next) => {
  try {
    const newStats = update(ctx.request.body)
    write(newStats)
    ctx.status = 200;
    ctx.body = { succeed: true, message: `stats updated` };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { succeed: false, message: `error: ${error}` };
  } finally {
    next()
  }
})

module.exports = {
  router
}