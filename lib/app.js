var express = require('express');
var app = express();
var router = require('./router');

app.use('/', router);


app.listen(process.env.PORT || 3030);
