var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(/[^\n]*/, function(req, res, next) {
  res.render('index', { title: 'Freyr' });
});

module.exports = router;
