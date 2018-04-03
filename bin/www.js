const express = require('express');
const mongodb = require('mongodb');

const app = express();

app.get('/', (req, res) => res.send('Hell World'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));