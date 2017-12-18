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
      movies: movies
    });
  });
});

module.exports = router;