"use strict";

var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var Chance = require('chance'),
  Chance = new Chance();

module.exports = function getRouter(directory) {
  directory = directory || '/data';
  var router = express.Router();
  router.use(bodyParser.json());
  router.get('/', function(req, res) {
    fs.readdir(`${directory}`, function(error, data) {
      if (error) throw new Error(error);
      else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.write(`notes directory contains: ${data.join(', ')}`);
        res.end();
      }
    });
  });
  router.get('/:name', function(req, res) {
    var fileName = req.params.name;
    var test = `${directory}/${fileName}.json`;
    fs.readFile(test, function(error, data) {
      if (error) throw new Error(error);
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
      res.write(data.toString());
      res.end();
    });
  });

  router.post('/', function(req, res) {
    var fName = Chance.first({
      gender: "female"
    });
    fs.writeFile(`${directory}/${fName}.json`, JSON.stringify(req.body, true, 2), err => {
      if (err) throw new Error(err);
      else {
        console.log(`${fName}.json saved`);
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end();
      }
    });
  });
  return router;
};
