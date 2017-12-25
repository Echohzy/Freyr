var express = require('express');
var router = express.Router();


router.get("/users/:id", function(req, res, next) {
  res.render('user', {title: 'User', id: req.params.id });
});

router.get("/movies/:id", function(req, res, next) {
  res.render('movie', { title: 'Movie', id: req.params.id });
});

router.get("/books/:id", function(req, res, next) {
  res.render('book', { title: "Book", id: req.params.id });
});

router.get("/search", function(req, res, next) {
  res.render('search', { title: "Freyr" });
});

/* GET home page. */
router.get(/[^\n]*/, function(req, res, next) {
  res.render('index', { title: 'Freyr' });
});

module.exports = router;
