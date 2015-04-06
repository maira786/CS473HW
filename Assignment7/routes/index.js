var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST the results. */
router.post('/', function(req, res, next){
	res.render('result', {id:"01", base: "hello"});
});

module.exports = router;
