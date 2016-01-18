"use strict";
var assert = require('assert');
var chai = require('chai');
var fs = require('fs');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var start = require('../lib/app');
var app = start();

describe('express server tests', function() {
  var server;

  before(function(done) {
    fs.readdir('data', function(err,files){
      if(err) {
        fs.mkdirSync('./data');
        fs.writeFileSync('./data/Alma.json', {"name": "max"});
      } else {
        console.log('direcory exists');
      }
      server = app.runApp('data', done);
    });
  });

  beforeEach(function(done) {
    chai.request('localhost:3030')
      .post('/notes')
      .send({
        "name": "max"
      })
      .end(function(error, response) {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });

  it('should put a new file in the data folder', function() {
    assert.equal(fs.readdirSync('data').length, 2); // Already has one test file in there name Alma so it should have that file always plus one
  });

  it('should now have three JSON files in the data directory', function() {
    assert.equal(fs.readdirSync('data').length, 3);
  });

  it('should write all the file names to our directory', function(done){
    chai.request('localhost:3030')
      .get('/notes')
      .end(function(error, response) {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });

  it('should get the contents of the specific name of the file I give', function(done){
    chai.request('localhost:3030')
      .get('/notes/Alma') // I have a test case name Alma.json in my data directory that I never remove
      .end(function(error, response) {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });

  after(function(done) {
    server.close(done);
    var files = fs.readdirSync('data'); // ii is set to one so I can always have a test case json file
    for (var ii = 1; ii < files.length; ii++) {
      var filePath = 'data' + '/' + files[ii];
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    }
  });
});
