"use strict";

var express = require('express');
var Chance = require('chance');
var chance = new Chance();

module.exports = function homePage() {
  var router = express.Router();
  router.get('/', function(req, res) {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.write('<h3> Hello there ' + chance.first() + ', welcome to the default page for the express assignment </h3>');
    res.end();
  });
  return router;
};
