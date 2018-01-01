var AV = require('leancloud-storage');

module.exports.addCollection = function(params) {
  var collection = new AV.Object('Collection');
  collection.set('collection_type', params.collection_type);
  var user = AV.Object.createWithoutData('Account', params.user_id);
  collection.set('user', user);
  if (params.review_id) {
    var review = AV.Object.createWithoutData('Review', params.review_id);
    collection.set('review', review);
  }
  return collection.save().then(function(data){
    return data.toJSON();
  });
}

module.exports.getCollectionsByUser = function(account_id) {
  var query = new AV.Query('Collection');
  query.contais('user', account_id).notEqualTo('deleted', true);
  return query.then(function(results){
    return results.toJSON();
  });
}

module.exports.updateCollection = function(id, params) {
  var query = new AV.Query('Collection');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(c){
    for (var k in params) {
      c.set(k, params[k]);
    }
    return c.save().then(function(data){
      return data.toJSON();
    });
  });
}