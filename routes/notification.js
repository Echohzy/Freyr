var express = require('express');
var router = express.Router();

var NotificationApi = require('../api/notification_api');

router.post("/", function(req, res) {
  NotificationApi.addNotification(req.body).then(function(data){
    res.json({
      status: "success",
      data: data
    });
  }).catch(function(error){
    res.status(400).json({
      status: 'success',
      error: error
    });
  });
});

router.get("/", function(req, res) {
  NotificationApi.getNoticesByUser(req.query.account_id).then(function(data){
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
  NotificationApi.updateNotice(req.params.id, {"deleted": true}).then(function(data) {
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
});

module.exports = router;