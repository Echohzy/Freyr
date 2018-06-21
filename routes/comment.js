var express = require('express');
var router = express.Router();

var CommentApi = require('../api/comment_api');

router.post('/', function(req, res) {
  var cookies = req.cookies;
  if(!cookies || !cookies.id) {
    res.status(401).json({
      status: "error",
      message: "invalid authentication"
    });
  } else {
    CommentApi.addComment(Object.assign({}, req.body, {user_id: cookies.id})).then(function(data) {
      res.json({
        status: 'success',
        data: data
      });
    }).catch(function(error) {
      res.status(400).json({
        error: error
      });
    });
  } 
  
});

router.get('/reviews/:id', function(req, res) {
  CommentApi.getCommentsByReview(req.params.id).then(function(data) {
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