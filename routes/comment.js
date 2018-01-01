var express = require('express');
var router = express.Router();

var CommentApi = require('../api/comment_api');

router.post('/', function(req, res) {
  CommentApi.addComment(req.body).then(function(data) {
    res.json({
      status: 'success',
      data: data
    });
  }).catch(function(error) {
    res.status(400).json({
      error: error
    });
  });
});

router.get('/', function(req, res) {
  CommentApi.getComment(req.query).then(function(data) {
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

router.delete('/:id', function(req, res) {
  CommentApi.updateComment(req.params.id, {'deleted': true}).then(function(data) {
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