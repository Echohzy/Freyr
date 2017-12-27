var AV = require('leancloud-storage');

module.exports.addAccount = function(params) {
  var Account = AV.Object.extend('Account');
  var account = new Account();
  account.set("nickname", params.nickname);
  account.set("avatar", params.avatar);
  return account.save().then(function(data) {
    return Promise.resolve(data);
  }, function(err){
    return Promise.reject(err);
  });
};

module.exports.getAccount = function(id) {
  var query = new AV.Query('Account');
   query.equalTo('id', parseInt(id)).notEqualTo('deleted', 1);
   return query.first().then(function(result){
      return Promise.resolve(result);
   }, function(error) { 
      return Promise.reject(error);
   });
};

module.exports.updateAccount = function(id, params) {
  var query = new AV.Query('Account');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', 1);
  return query.first().then(function(account){
    for( var k in params ) {
      account.set(k, params[k]);
    }
    return account.save().then(function(data){
      return Promise.resolve(data);
    }).catch(function(error) { 
      return Promise.reject(error);
    });
  }).catch(function(error){
    return Promise.reject(error);
  });
};