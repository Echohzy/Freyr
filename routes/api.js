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



router.get("/movies/:id/reviews", function(req, res) {
  fs.readFile(path.join(__dirname, "../api/movie_reviews.json"), (err, data)=>{
    if (err) {
      res.status(404).json({
        error: "document not found"
      });
      return;
    }

    let reviews = JSON.parse(data);
    res.json({
      reviews: reviews.data
    });
  });
});



router.get("/books/:id", function(req, res) {
   fs.readFile(path.join(__dirname, "../api/book.json"), (err, data)=>{
    if (err) {
      res.status(404).json({
        error: "document not found"
      });
      return;
    }

    let book = JSON.parse(data);
    res.json({
      book: book.data
    });
  });
});



router.get("/books/:id/reviews", function(req, res) {
  fs.readFile(path.join(__dirname, "../api/book_reviews.json"), (err, data)=>{
    if (err) {
      res.status(404).json({
        error: "document not found"
      });
      return;
    }

    let reviews = JSON.parse(data);
    res.json({
      reviews: reviews.data
    });
  });
});

router.get("/search", function(req, res) {  
  return new Promise(function (resolve, reject){
    fs.readFile(path.join(__dirname, "../api/hot_books.json"), (err, data)=>{
      if (err) {
        reject({
          error: "document not found"
        })
      }
      let books = JSON.parse(data);
      resolve(books);
    });
  }).then(function(data){
    fs.readFile(path.join(__dirname, "../api/hot_movies.json"), (err, doc)=>{
      if (err) {
        return Promise.reject({
          error: "document not found"
        });
      }
      let result = JSON.parse(doc);
      res.json({
        books: data.data,
        movies: result.data
      });
    });
  }).catch(function(error){
    res.status(404).json(error);
  })
});

router.get("/accounts/:id/interestes.json", function(req, res){
  fs.readFile(path.join(__dirname, "../api/interestes.json"), (err, data)=>{
    if (err) {
      res.status(404).json({
        error: "document not found"
      });
    }

    let interestes = JSON.parse(data);
    res.json({
      interestes: interestes.data
    });

  });
});

router.get("/accounts/:id/collections.json", function(req, res){
  fs.readFile(path.join(__dirname, "../api/collections.json"), (err, data)=>{
    if (err) {
      res.status(404).json({
        error: "document not found"
      });
    }

    let collections = JSON.parse(data);
    res.json({
      collections: collections.data
    });
  });
});


router.get("/accounts/:id/reviews.json", function(req, res) {
  fs.readFile(path.join(__dirname, "../api/movie_reviews.json"), (err, data)=>{
    if (err) {
      res.status(404).json({
        error: "document not found"
      });
    }
    
    let reviews = JSON.parse(data);
    res.json({
      reviews: reviews.data
    });
  });
});


router.get("/reviews/:id", function(req, res) {
  fs.readFile(path.join(__dirname, "../api/review.json"), (err, data)=>{
    if (err) {
      res.status(404).json({
        error: "document not found"
      });
    }
    
    let review = JSON.parse(data);
    res.json({
      review: review.data
    });
  });
});


module.exports = router;