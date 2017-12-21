var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");

router.get("/hot_movies.json", function(req, res) {
  fs.readFile(path.join(__dirname, "../api/hot_movies.json"), (err, data)=>{
    if(err) {
      res.status(404).json({
        error: "document not found"
      });
      return;
    }

    let movies = JSON.parse(data);
    res.json({
      movies: movies.data
    });
  });
});

router.get("/hot_books.json", function(req, res) {
  fs.readFile(path.join(__dirname, "../api/hot_books.json"), (err, data)=>{
    if (err) {
      res.status(404).json({
        error: "document not found"
      });
      return;
    }

    let books = JSON.parse(data);
    res.json({
      books: books.data
    });
  });
});

router.get("/accounts/:id", function(req, res) {
  fs.readFile(path.join(__dirname, "../api/account.json"), (err, data)=>{
    if (err) {
      res.status(404).json({
        error: "document not found"
      });
      return;
    }

    let account = JSON.parse(data);
    res.json({
      account: account.data
    });
  });
});


router.get("/movies/:id", function(req, res) {
   fs.readFile(path.join(__dirname, "../api/movie.json"), (err, data)=>{
    if (err) {
      res.status(404).json({
        error: "document not found"
      });
      return;
    }

    let movie = JSON.parse(data);
    res.json({
      movie: movie.data
    });
  });
});

module.exports = router;