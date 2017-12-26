var AV = require('leancloud-storage');

var Account = AV.Object.extend('Account');

module.exports.addAccount = function(params) {
  var account = new Account();
  account.set("nickname", params.nickname);
  account.set("avatar", params.avatar);
  return account.save().then(function(data) {
    return Promise.resolve(data);
  }, function(err){
    return Promise.reject(err);
  });
}