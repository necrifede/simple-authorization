
const Router = require('@koa/router');
const { update, write, read } = require('./messages')

const router = new Router();

router.get('/stats', (ctx, next) => {

  try {
    if (ctx.state.user !== 'admin') {
      throw Error('Unauthorized request')
    }
    const stats = read()
    ctx.status = 200
    ctx.body = stats
  } catch (error) {
    ctx.body = { succeed: false, message: `error: ${error}` };
    ctx.status = 401;
  }
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

router.get('/health', (ctx, next) => {
  ctx.status = 200
})

module.exports = {
  router
}