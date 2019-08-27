const express = require('express');
const lemLib = require('../dist/index');
const app = express();

lemInstance = new lemLib.lem();

app.use(lemInstance.createInstance());

app.get('/', (req, res) => { // new
  res.send('Homepage! Hello world.');
});

app.post('/add', (req, res) => { // new
  res.send('post add route');
});

app.delete('/2', (req, res) => { // new
  res.send('delete 2');
});

app.put('/1', (req, res) => { // new
  res.send('put 1');
});

app.listen(3000, () => console.log('listening on port 3000'));
