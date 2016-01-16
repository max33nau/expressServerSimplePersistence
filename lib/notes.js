var fs = require('fs');
var express = require('express');
var jade = require('jade');
var bodyParser = require('body-parser');
var Chance = require('chance'),
    Chance = new Chance();
fName = Chance.first({
    gender: "female"
});

module.exports = function getRouter( directory ) {
    directory = directory || '/data';
    var router = express.Router();
    router.use(bodyParser.json());
    router.get('/', function(req, res) {
        var file = fs.readdir(`..${directory}`, function(error, data) {
            if (error) throw new Error(error);
            else {
                res.write(`notes directory contains: ${data.join(', ')}`);
                res.end();
            }
        });
    });
    router.get('/:name', function(req, res) {
        var fileName = req.params.name;
        var test = `..${directory}/${fileName}.json`;
        var file = fs.readFile(test, function(error, data) {
            if (error) throw new Error(error);
            res.write(data.toString());
            res.end();
        });
    });

    router.post('/', function(req, res) {
        fs.writeFile(`..${directory}/${fName}.json`, JSON.stringify(req.body, true, 2), err => {
            if (err) throw new Error(err);
            else {
                console.log(`${fName}.json saved`)
                res.end();
            }
        })
    });
    return router;
}
