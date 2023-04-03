require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { router: messagesRoutes } = require('./messages/routes')
const { router: userRoutes } = require('./users')
const { isAuth } = require('./users/middlewares')
const app = new Koa();

app.use(bodyParser());
app.use(isAuth)

app.use(userRoutes.routes())
app.use(messagesRoutes.routes())

app.listen(3000);
