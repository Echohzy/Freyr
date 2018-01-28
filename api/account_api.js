var AV = require('leancloud-storage');

module.exports.signup = function(params) {
  var user = new AV.User();
  user.setUsername(params.username);
  user.setPassword(params.password);
  user.setEmail(params.email);
  return user.signUp().then(function(loginedUser){
    return loginedUser.toJSON();
  });
};

module.exports.login = function(params) {
  return AV.User.logIn(params.username, params.password).then(function(current_user){
    return current_user.toJSON();
  });
}

module.exports.getAccount = function(id) {
  var query = new AV.Query('Account');
   query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
   return query.first().then(function(result){
      try {
        var res = result.toJSON();
        return res;
      } catch(e) {
        return Promise.reject('can not found');
      }
   });
};

module.exports.updateAccount = function(id, params) {
  var query = new AV.Query('Account');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(account){
    try {
      for( var k in params ) {
        account.set(k, params[k]);
      }
      return account.save().then(function(data){
        return data.toJSON();
      });
    } catch(e) {
      return Promise.error('can not found');
    }
  });
};