var express = require('express');
var router = express.Router();

var AccountApi = require("../api/account_api");

// sign up
router.post('/sign_up', function(req, res) {
  AccountApi.signup(req.body).then(function(current_user){
    res.cookie('username', current_user.username, { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.cookie('avatar', current_user.avatar, { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.cookie('id', current_user.id, { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.json({
      status: "success",
      user: current_user
    });
  }).catch(function(error) {
    res.status(400).json({
      status: "error",
      error: error
    });
  });
});

// login 
router.post('/login', function(req, res) {
  AccountApi.login(req.body).then(function(current_user) {
    res.cookie('username', current_user.username, { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.cookie('avatar', current_user.avatar, {expires: new Date(Date.now() + 900000), httpOnly: true });
    res.cookie('id', current_user.id, {expires: new Date(Date.now() + 900000), httpOnly: true });
    res.json({
      status: "success",
      user: {
        id: current_user.id,
        avatar: current_user.avatar,
        username: current_user.username
      }
    });
  }).catch(function(error){
    if(error.code===211){
      res.status(400).json({
        status: "error",
        error:{
          attr: "username",
          message: "用户名或密码错误"
        }
      });
    } else {
      res.status(400).json({
        error: error
      })
    }
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