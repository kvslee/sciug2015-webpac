var express = require('express');
var router = express.Router();
var fs = require('fs');
var jsonfile = require('jsonfile');


/* GET users listing. */
router.get('/', function(req, res, next) {
	var file = __dirname + '/ajaxData.json';
	var emails = jsonfile.readFileSync(file);
	res.send(emails);

});

router.post('/', function(req, res, next) {
	var file = __dirname + '/ajaxData.json';
	var emails = jsonfile.readFileSync(file);
	console.log(req.body);
	emails.push(req.body);

	jsonfile.writeFile(file, emails, {spaces: 2},  function (err) {
          console.error(err);
          res.end();
	})

});

module.exports = router;