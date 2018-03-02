var express = require('express');
var router = express.Router();

var FileApi = require("../api/file_api");

router.post("/upload", function(req, res){
  FileApi.uploadImage(req.body.name, req.body.file).then(function(url){
    res.json({
      status: "success",
      url: url
    });
  }).catch(function(error){
    res.status(400).json({

    })
  })
});

module.exports = router;