"use strict";

var express = require('express');
var router = require('./notes');
var homePage = require('./default');

var app = express();

app.use('/notes', router('/data'));
app.use('/', homePage());

app.listen(process.env.PORT || 3030);

module.exports = app;
