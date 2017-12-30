var AV = require('leancloud-storage');

module.exports.addCollection = function(params) {
  var collection = new AV.Object('Collection');
  collection.set('collection_type', params.collection_type);
  var user = AV.Object.createWithoutData('Account', params.user_id);
  collection.set('user', user);
  if (params.movie_review_id) {
    var movie_review = AV.Object.createWithoutData('MovieReview', params.movie_review_id);
    collection.set('movie', movie_review);
  } else if (params.book_review_id) {
    var book_review = AV.Object.createWithoutData('BookReview', params.bok_review_id);
    collection.set('book', book_review);
  }
  return collection.save().then(function(data){
    return data.toJSON();
  });
}

module.exports.getCollectionsByUser = function(account_id) {
  var query = new AV.Query('Collection');
  query.contais('user', account_id).notEqualTo('deleted', true);
  
  return query.first().then(function(results){
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