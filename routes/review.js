var express = require('express');
var router = express.Router();
var ReviewApi = require('../api/review_api');

/*create account*/
router.post("/", function(req, res) {
  ReviewApi.addReview(req.body).then(function(data){
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
  ReviewApi.updateReview(req.params.id, req.body).then(function(data) {
    res.json({
      status: 'success',
      data: data
    });
  }).catch(function(error) {
    res.status(400).json({
      status: 'error',
      error: error
    });
  });
});


/*delete account*/
router.delete("/:id", function(req, res) {
  ReviewApi.updateReview(req.params.id, {"deleted": true}).then(function(data) {
    res.json({
      status: 'success'
    });
  }).catch(function(error) {
    res.status(400).json({
      status: 'error'
    });
  });
});


module.exports = router;