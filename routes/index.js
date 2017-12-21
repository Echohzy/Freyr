var express = require('express');
var router = express.Router();


router.get("/movies/:id", function(req, res, next) {
  res.render('movie', { title: 'Movie', id: req.params.id });
});


/* GET home page. */
router.get(/[^\n]*/, function(req, res, next) {
  res.render('index', { title: 'Freyr' });
});

module.exports = router;
