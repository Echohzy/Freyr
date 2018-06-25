var express = require('express');
var router = express.Router();
var ReviewApi = require('../api/review_api');

/*create account*/
router.post("/", function(req, res) {
  var cookies = req.cookies;
  if(!cookies || !cookies.id){
    res.status(401).json({
      status: "error",
      message: "invalid authentication"
    });
  } else {
    ReviewApi.addReview( Object.assign({author_id: cookies.id}, req.body) ).then(function(data){
      res.json({
        status: 'success',
        data: data
      });
    }).catch(function(error){
      res.status(400).json({
        status: "error",
        error: error
      });
    });
  }
});

router.get("/books/:id", function(req, res) {
  ReviewApi.getBookReviews(req.params.id)
  .then(function(data){
    res.json({
      status: "success",
      data: data
    });
  }).catch(function(error){
    res.status(404).json({
      status: 'error',
      error: error
    })
  })
});


router.post("/:id/like", function(req, res) {
  var cookies = req.cookies;
  if(!cookies || !cookies.id){
    res.status(401).json({
      status: "error",
      message: "invalid authentication"
    });
  } else {
    ReviewApi.likeOrDislikeReview(cookies.id, req.params.id, req.body.type)
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
    });
  }
});

/*get account*/
router.get("/:id", function(req, res) {
  ReviewApi.getReview(req.params.id).then(function(data){
    res.json({
      status: "success",
      data: data
    });
  }).catch(function(error){
    res.status(404).json({
      status: 'error',
      error: error
    });
  });
});


/*update account*/
router.put("/:id", function(req, res) {
  var cookies = req.cookies;
  if(!cookies || !cookies.id){
    res.status(401).json({
      status: "error",
      message: "invalid authentication"
    });
  } else {
    ReviewApi.updateReview(req.params.id, Object.assign({author_id: cookies.id}, req.body)).then(function(data) {
      res.json({
        status: 'success',
        data: data
      });
    }).catch(function(error) {
      res.status(400).json({
        status: 'error',
        error: error.message||error
      });
    });
  }
});


/*delete account*/
router.delete("/:id", function(req, res) {
  ReviewApi.deleteReview(req.params.id).then(function(data) {
    res.json({
      status: 'success'
    });
  }).catch(function(error) {
    res.status(400).json({
      status: 'error',
      error: error.message
    });
  });
});


module.exports = router;