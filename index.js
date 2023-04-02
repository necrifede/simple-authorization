require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { router } = require('./routes')
const { router: userRoutes } = require('./users')
const { isAuth } = require('./users/middlewares')
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next()
});

app.use(bodyParser());
app.use(isAuth)

app.use(userRoutes.routes())
app.use(router.routes())

app.listen(3000);
