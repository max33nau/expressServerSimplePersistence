"use strict";

var express = require('express');
var router = require('./notes');
var homePage = require('./default');


module.exports = function startServer() {
  var appModule = {};

  appModule.runApp = function(directory, callback) {
    var app = express();
    app.use('/notes', router(directory));
    app.use('/', homePage());
    var server = app.listen(process.env.PORT || 3030, function() {
      console.log('server is connected');
      callback();
    });

    return {
      close: function(callback) {
        server.close(callback);
      }
    };
  };

  return appModule;
};
