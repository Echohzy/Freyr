var express = require('express');
var router = express.Router();


var CollectionApi = require('../api/collection_api');


router.post("/", function(req, res){
  var cookies = req.cookies;
  if(!cookies || !cookies.id){
    res.status(401).json({
      status: "error",
      message: "invalid authentication"
    });
  } else {
    CollectionApi.addCollection({book_id: req.body.book_id, user_id: cookies.id})
    .then(function(data){
      res.json({
        status: "success",
        data: data
      })
    }).catch(function(error){
      res.status(400).json({
        status: "error",
        error: error
      });
    });
  }
});

router.get("/", function(req, res){
  CollectionApi.getCollectionsByUser(req.query.user_id)
  .then(function(data){
    res.json({
      status: 'success',
      data: data
    })
  })
});

router.delete("/:id", function(req, res){
  var cookies = req.cookies;
  if(!cookies||!cookies.id){
    res.status(401).json({
      status: "error",
      message: "invalid authentication"
    });
  }else {
    CollectionApi.deleteCollection(req.params.id, cookies.id)
    .then(function(){
      return {
        status: 'success'
      }
    }).catch(function(error){
      return res.status(400).json({
        status: 'error',
        error: error
      })
    })
  }
  
})



module.exports  = router;