var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lets Play' });
});
router.get('/play/rock', function(req, res) {
    res.render('index', { title: 'played rock' })
});
router.get('/play/paper', function(req, res) {
    res.render('paper', { title: 'Hello, World!' })
});
router.get('/play/scissors', function(req, res) {
    res.render('scissors', { title: 'Hello, World!' })
});
router.get('/play/lizard', function(req, res) {
    res.render('lizard', { title: 'Hello, World!' })
});
router.get('/play/spock', function(req, res) {
    res.render('spock', { title: 'Hello, World!' })
});


module.exports = router;
