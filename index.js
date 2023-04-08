require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require("koa-static");
const mount = require("koa-mount");
const { router: messagesRoutes } = require('./messages/routes')
const { router: userRoutes } = require('./users')
const { cors } = require('./cors')
const { isAuth } = require('./users/middlewares')

const app = new Koa();

const statics = new Koa();
statics.use(serve(__dirname + "/ui/dist"));
app.use(mount("/", statics));


app.use(cors);

app.use(bodyParser());
app.use(isAuth)

app.use(userRoutes.routes())
app.use(messagesRoutes.routes())

app.listen(3000);
