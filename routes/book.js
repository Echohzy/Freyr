var express = require('express');
var router = express.Router();

var BookApi = require('../api/book_api');

router.post("/", function(req, res) {
  BookApi.addBook(req.body).then(function(data){
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

router.get('/:id',function (req, res){
  BookApi.getBook(req.params.id).then(function(data){
    res.json({
      status: 'success',
      data: data
    });
  }).catch(function(error){
    res.status(404).json({
      status: 'error',
      error: error
    });
  });
});

router.get("/", function (req, res){
  BookApi.getBooks().then(function(data){
    res.json({
      status: 'success',
      data: data
    });
  }).catch(function(error){
    res.status(404).json({
      status: "error",
      error: error
    });
  });
});

router.delete('/:id', function(req, res) {
  BookApi.updateBook(req.params.id, {'deleted': true}).then(function(data) {
    res.json({
      status: 'success',
      data: data
    });
  }).catch(function(error){
    res.status(404).json({
      error: error
    });
  });
});

module.exports = router;