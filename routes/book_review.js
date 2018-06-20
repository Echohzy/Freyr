var express = require('express');
var router= express.Router();

var BookReviewApi = require('../api/book_review_api');


router.post('/', function(req, res) {
  BookReviewApi.addBookReview(req.body).then(function(data){
    res.json({
      status:'success',
      data: data
    });
  }).catch(function(error){
    res.status(404).json({
      error: error
    });
  });
});

/*get review by book id*/

router.get('/books/:id', function(req, res) {
  BookReviewApi.getBookReviews(req.params.id)
  .then(function(data){
    res.json({
      status: "success",
      data: data
    });
  }).catch(function(error){
    res.status(404).json({
      status: "error",
      error: error
    });
  })
});


router.get('/:id', function(req, res) {
  BookReviewApi.getBookReview(req.params.id).then(function(data){
    res.json({
      status: 'success',
      data: data
    });
  }).catch(function(error) {
    res.status(404).json({
      error: error
    });
  });
});

router.delete('/:id', function(req, res) {
  BookReviewApi.updateBookReview(req.params.id, {'deleted': true}).then(function(data) {
    res.json({
      status: 'success'
    });
  }).catch(function(error){
    res.status(404).json({
      error: error
    });
  });
});


module.exports = router;