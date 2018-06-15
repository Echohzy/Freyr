var express = require('express');
var router = express.Router();

router.get("/notifications", function(req, res, next){
  res.render('notification', {title: 'Notification' });
});

router.get("/sign_up", function(req, res, next){
  res.render('sign_up', {title: 'Sign Up' });
});

router.get("/sign_in", function(req, res, next){
  res.render('sign_in', {title: 'Sign In'});
});

router.get("/reviews/:id", function(req, res, next) {
  res.render('review', {title: 'Review', id: req.params.id });
});

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

router.get("/todo", function(req, res, next){
  res.render('todo', { title: "Todo" });
});

/* GET home page. */
router.get(/[^\n]*/, function(req, res, next) {
  res.render('index', { title: 'Freyr' });
});

module.exports = router;
