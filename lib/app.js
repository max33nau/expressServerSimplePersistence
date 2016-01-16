var express = require('express');
var router = require('./notes.js');

var app = express();

app.use('/notes', router('/data'));



app.listen(process.env.PORT || 3030);

module.exports = app;
