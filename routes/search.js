var express = require('express');
var router = express.Router();

var SearchApi = require("../api/search_api");


/*get search result*/
router.get("/", function(req, res){
  if(req.query.type==="review"){
    SearchApi.getSearchReviews(req.query.keyword).then(function(data){
      res.json({
        status: "success",
        data: data
      });
    }).catch(function(error){
      res.status(400).json({
        status: 'error',
        error: error
      });
    })
  } else {
    SearchApi.getSearchBooks(req.query.keyword).then(function(data){
      res.json({
        status: "success",
        data: data
      });
    }).catch(function(error){
      res.status(400).json({
        status: 'error',
        error: error
      });
    })
  }
});

module.exports = router;