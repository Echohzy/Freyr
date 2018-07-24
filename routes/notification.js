var express = require('express');
var router = express.Router();

var NotificationApi = require('../api/notification_api');

router.get("/", function(req, res) {
  NotificationApi.getNoticesByUser(req.query.user_id).then(function(data){
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

router.delete("/:id", function (req, res) {
  var cookies = req.cookies;
  if(!cookies || !cookies.id){
    res.status(401).json({
      status: "error",
      message: "invalid authentication"
    });
  } else {
     NotificationApi.deleteNotice(req.params.id).then(function(data) {
      res.json({
        status: 'success',
        data: data
      });
    }).catch(function(error){
      res.json({
        status: 'error',
        error: error
      });
    });
  }
 
});

module.exports = router;