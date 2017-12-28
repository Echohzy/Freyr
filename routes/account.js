var express = require('express');
var router = express.Router();

var AccountApi = require("../api/account_api");


/*create account*/
router.post("/", function(req, res) {
  AccountApi.addAccount(req.body).then(function(data){
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
  AccountApi.getAccount(req.params.id).then(function(data){
    res.json({
      status: "success",
      data: data
    });
  }).catch(function(error){
    res.status(400).json({
      status: 'error',
      error: error
    });
  });
});


/*update account*/
router.put("/:id", function(req, res) {
  AccountApi.updateAccount(req.params.id, req.body).then(function(data) {
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


/*delete account*/
router.delete("/:id", function(req, res) {
  AccountApi.updateAccount(req.params.id, {"deleted": true}).then(function(data) {
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