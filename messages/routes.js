
const Router = require('@koa/router');
const { update, write, read } = require('./index')

const router = new Router({ prefix: '/api' });

router.options('/stats', (ctx, next) => {
  ctx.status = 200
})

router.get('/stats', async (ctx, next) => {

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

router.options('/message', (ctx, next) => {
  ctx.status = 200
})

router.post('/message', async (ctx, next) => {
  try {
    const newStats = update(ctx.request.body)
    write(newStats)
    ctx.body = { succeed: true, message: `stats updated` };
    ctx.status = 200;
  } catch (error) {
    ctx.body = { succeed: false, message: `error: ${error}` };
    ctx.status = 400;
  }
})

router.get('/health', async (ctx, next) => {
  ctx.status = 200
  ctx.body = 'ok'
})

module.exports = {
  router
}
