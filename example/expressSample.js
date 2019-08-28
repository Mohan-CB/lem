const express = require('express');
const lem = require('../dist/index');
const app = express();

lemInstance = new lem.lem(null, {
  include: {
    '/add': 10,
    '/minus': 10
  },
  exclude: [
    '/multiply',
    '/divide'
  ]
},
  console.log);

app.use(lemInstance.register());

app.get('/add', (req, res) => { // new
  res.send('get add route');
});

app.get('/minus', (req, res) => { // new
  res.send('get minus route');
});

app.get('/multiply', (req, res) => { // new
  res.send('get multiply route');
});

app.get('/divide', (req, res) => { // new
  res.send('get divide route');
});

app.listen(3000, () => console.log('listening on port 3000'));
