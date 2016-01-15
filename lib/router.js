
var fs = require('fs');
var express = require('express');
var jade = require('jade');
var router = express.Router();
var bodyParser = require('body-parser');

var Chance = require('chance'),
    Chance = new Chance();
    fName = Chance.first({gender: "female"});

var url = '/notes';
var directory = '/data';
var name = 'Josie';


router.use(bodyParser.json());

router.get(url, function(req, res) {
     var file = fs.readdir(`..${directory}`, function(error,data){
       if(error) throw new Error(error);
       else {
         res.write(`notes directory contains: ${data.join(', ')}`);
         res.end();
       }
     });

});
router.get(`${url}/${name}`, function(req, res) {
    var test = `..${directory}/${name}.json`;
    var file = fs.readFile(test, function(error,data) {
      if(error) throw new Error(error);
        res.write(data.toString());
        res.end();
    });

});

router.post(url, function(req, res) {
  fs.writeFile(`..${directory}/${fName}.json`, JSON.stringify(req.body, true, 2), err => {
        if (err) throw new error;
        else {
            console.log(`${fName}.json saved`)
            res.end();
        }
    })
});

module.exports = router;
