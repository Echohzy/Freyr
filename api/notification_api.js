var AV = require('leancloud-storage');

module.exports.addNotification = function(params) {
  var notice = new AV.Object('Notice');
  notice.set('content', params.content);
  var creator = AV.Object.createWithoutData('Account', params.creator_id);
  var user = AV.Object.createWithoutData('Account', params.user_id);

  notice.set('creator', creator);
  notice.set('user', user);

  return notice.save().then(function (data){
    return data.toJSON();
  });
};


module.exports.getNoticesByUser = function(account_id) {
  var query = new AV.Query('Notice');
  query.contains('user', account_id).notEqualTo('deleted', true);
  return query.find().then(function(results){
    return results.toJSON();
  });
}

module.exports.updateNotice = function(id, params) {
  var query = new AV.Query('Notice');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(notice){
    for( var k in params ) {
      notice.set(k, params[k]);
    }
    return notice.save().then(function(data) {
      return data.toJSON();
    });
  })
}