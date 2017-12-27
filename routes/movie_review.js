var express = require('express');
var router = express.Router();

var MovieReviewApi = require("../api/movie_review_api");

/*create account*/
router.post("/movies", function(req, res) {
  MovieReviewApi.addMovieReview(req.body).then(function(data){
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

module.exports = router;

