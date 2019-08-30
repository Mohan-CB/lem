const express = require('express');
const lem = require('../dist/index');
const app = express();
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', (message) => {
  console.log(`an expire event occurred! details: ${message}`);
  // customized code
});

const x = (message) => myEmitter.emit('event', message);


lemInstance = new lem.lem(null, null, x);

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
