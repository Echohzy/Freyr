var express = require('express');
var router = express.Router();
var InterestApi = require('../api/interest_api');


/*create account*/
router.post("/", function(req, res) {
  InterestApi.addInterest(req.body).then(function(data){
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
router.get("/:id", function(req, res) {
  InterestApi.getInterest(req.params.id).then(function(data){
    res.json({
      status: "success",
      data: data
    });
  }).catch(function(error){
    res.status(404).json({
      status: 'error',
      error: error
    });
  });
});

/*delete account*/
router.delete("/:id", function(req, res) {
  InterestApi.updateInterest(req.params.id, {"deleted": true}).then(function(data) {
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
