const jwt = require('jwt-simple')
const add = require('date-fns/add')
const getUnixTime = require('date-fns/getUnixTime')

const TOKEN_DURATION = { days: 7 }

const createToken = (user) => {
  const now = Date.now()
  const payload = {
    sub: user.username,
    iat: getUnixTime(now),
    exp: getUnixTime(add(now, TOKEN_DURATION))
  }

  // TODO: add a expiration date
  return jwt.encode(payload, process.env.SECRET_TOKEN)
}

const decodeToken = (token) => {
  return jwt.decode(token, process.env.SECRET_TOKEN)
}

module.exports = {
  createToken,
  decodeToken
}