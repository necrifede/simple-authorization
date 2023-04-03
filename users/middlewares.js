const { getUnixTime } = require("date-fns")
const { decodeToken } = require("./utils")

const isAuth = (ctx, next) => {
  try {
    const now = Date.now()
    const header = ctx.headers.authorization
    if (ctx.request.url === '/api/login' || ctx.request.url === '/api/health') {
      return next()
    }

    if (!/bearer/i.test(header)) {
      throw Error(`Missing token information`)
    }

    const token = header.split(' ').filter(x => x)?.[1]
    const payload = decodeToken(token)

    if (payload.exp <= getUnixTime(now)) {
      // TODO: maybe send 401
      throw Error('Expired token')
    }

    ctx.state.user = payload.sub

    return next()

  } catch (error) {
    ctx.status = 403
    ctx.body = error?.message ?? 'Unknown user error'
  }
}

module.exports = {
  isAuth
}