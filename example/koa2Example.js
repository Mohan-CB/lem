const Koa = require('koa');

const app = new Koa();
const PORT = process.env.PORT || 3000;

const Router = require('koa-router');
const router = new Router();

const lemLib = require('../dist/index');

lemInstance = new lemLib.lem(null, {
  include: {
    '/add': 10,
    '/minus': 10
  },
  exclude: [
    '/multiply',
    '/divide'
  ]
});

app.use(lemInstance.createInstance());

router.get('/add', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
})

router.get('/minus', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
})

router.get('/multiply', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
})

router.get('/divide', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
})

app.use(router.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
