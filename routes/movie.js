var express = require('express');
var router = express.Router();

var MovieApi = require("../api/movie_api");


/*create account*/
router.post("/movies", function(req, res) {
  MovieApi.addMovie(req.body).then(function(data){
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

/*get account*/
router.get("/movies/:id", function(req, res) {
  MovieApi.getMovie(req.params.id).then(function(data){
    res.json({
      status: "success",
      data: data
    });
  }).catch(function(error){
    res.status(400).json({
      status: 'error',
      error: error
    });
  });
});


/*update account*/
router.put("/movies/:id", function(req, res) {
  MovieApi.updateMovie(req.params.id, req.body).then(function(data) {
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
router.delete("/movies/:id", function(req, res) {
  MovieApi.updateMovie(req.params.id, {"deleted": true}).then(function(data) {
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