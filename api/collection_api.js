var AV = require('leancloud-storage');
var _ = require('lodash');

module.exports.addCollection = function(params) {
  var collection = new AV.Object('Collection');
  var user_query = new AV.Query('_User');
  var u, b;
  user_query.equalTo('id', params.user_id).notEqualTo('deleted'. true);
  return user_query.first().then(function(user){
    u = user;
    var up = AV.Object.createWithoutData('_User', user.id);
    var book_query = new AV.Query("Book");
    collection.set("user", up);
    book_query.equalTo('id', params.book_id).notEqualTo('deleted', true);
    return book_query.first();
  }).then(function(book){
    b = book;
    var bp = AV.Object.createWithoutData('Book', book.id);
    collection.save("book", bp);
    return collection.save();
  }).then(function(collection){
    var query = new AV.Query("Collection");
    return query.get(collection.id).then(function(c){
      return {
        id: c.id,
        user:{
          id: u.get('id'),
          avatar: u.get('avatar'),
          username: u.get('username')
        },
        book:{
          id: b.get('id'),
          title: b.get('title'),
          score: b.get('score'),
          review_count: b.get('review_count')
        }
      }
    });
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