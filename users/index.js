const Router = require('@koa/router');
const users = require('./users.json');
const { createToken } = require('./utils');

const router = new Router();

router.get('/login', (ctx, next) => {
  try {
    const header = ctx.headers.authorization
    if (!/basic/i.test(header)) {
      throw Error('Not Basic authentication')
    }
    
    const encoded = header.split(' ').filter(x => x)?.[1]
    const buff = Buffer.from(encoded, 'base64');
    const [user, pwd] = buff.toString('utf-8').split(':');

    // TODO: passwords should be encrypted
    if (!users.find(({ username, password }) => username === user && password === pwd)) {
      throw Error(`Wrong password or user '${user}' does not exists`)
    }

    ctx.body = createToken({ username: user })
    ctx.status = 200

  } catch (error) {
    ctx.status = 403
    ctx.body = error?.message ?? 'Unknown user error'
  }
})

router.post('/logout', (ctx, next) => {
  // Logout is not needed, tokens lasts for TOKEN_DURATION time in days
  // by the other side on frontend should remove the token when logout.
  next()
})

module.exports = {
  router
}