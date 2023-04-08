require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { router: messagesRoutes } = require('./messages/routes')
const { router: userRoutes } = require('./users')
const { isAuth } = require('./users/middlewares')
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');
  ctx.set('Access-Control-Max-Age', '1728000');
  ctx.set('Access-Control-Allow-Credentials', 'true');
  await next()
});

app.use(bodyParser());
app.use(isAuth)

app.use(userRoutes.routes())
app.use(messagesRoutes.routes())

app.listen(3000);
