const cors = (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');
  ctx.set('Access-Control-Max-Age', '1728000');
  ctx.set('Access-Control-Allow-Credentials', 'true');
  next()
}

module.exports = {
  cors
}