var AV = require('leancloud-storage');
var _ = require('lodash');

module.exports.addNotification = function(params) {
    var notice = new AV.Object('Notice');
    var creator_query = new AV.Query("_User");
    creator_query.equalTo('id', parseInt(params.creator_id)).notEqualTo('deleted', true);
    return creator_query.first().then(function(creator){
      var cp = AV.Object.createWithoutData('_User', creator.id);
      notice.set("creator", cp);
      notice.set("content", params.content);
      var user_query = new AV.Query('_User');
      user_query.equalTo("id", parseInt(params.user_id)).notEqualTo('deleted', true);
      return user_query.first();
    }).then(function(user){
      var up = AV.Object.createWithoutData('_User', user.id);
      notice.set('user', up);
      return notice.save();
    });
};


module.exports.getNoticesByUser = function(user_id) {
  var user_query = new AV.Query("_User");
  var u;
  user_query.equalTo("id", parseInt(user_id)).notEqualTo('deleted', true);
  return user_query.first().then(function(user){
    var u = user;
    var up = AV.Object.createWithoutData('_User', user.id);
    var notice_query = new AV.Query('Notice');
    notice_query.equalTo("user", up).notEqualTo('deleted', true);
    return notice_query.find();
  }).then(function(notices){
    var ps = [];
    notices.forEach(function(n){
      var creator_query = new AV.Query("_User");
      ps/push(creator_query.get(n.get('user').id).then(function(creator){
        return {
          id: n.get('id'),
          content: n.get('id'),
          user: {
            id: u.get('id'),
            avatar: u.get('avatar'),
            username: u.get('username')
          },
          creator: {
            id: creator.get('id'),
            avatar: creator.get('avatar'),
            username: creator.get('username')
          }
        };
      }));
      return AV.Promise.all(ps);
    })
  });
}

module.exports.deleteNotice = function(id) {
  var notice_query = new AV.Query("Notice");
  notice_query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return notice_query.first().then(function(notice){
    notice.set('deleted', true);
    return notice.save();
  });
}