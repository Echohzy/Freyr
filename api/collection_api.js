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
          price: b.get('price'),
          score: b.get('score'),
          review_count: b.get('review_count')
        }
      }
    });
  });
}

module.exports.getCollectionsByUser = function(user_id){
  var user_query = new AV.Query("_User");
  var u;
  user_query.equalTo("id", parseInt(user_id)).notEqualTo('deleted', true);
  return user_query.first().then(function(user){
    if(user){
      u = user;
      var up = AV.Object.createWithoutData('_User', u.id);
      var col_query = new AV.Query("Collection");
      col_query.equalTo('user', up).notEqualTo('deleted', true);
      return col_query.find();
    } else {
      return AV.Promise.reject('can not find user');
    }
  }).then(function(collections){
    var ps = [];
    collections.forEach(function(col){
      var book_query = new AV.Query("Book");
      ps.push(book_query.get(col.get("book").id).then(function(book){
        return {
          id: col.get('id'),
          user: {
            id: u.get("id"),
            avatar: u.get("avatar"),
            username: u.get("username")
          },
          book: {
            id: book.get("id"),
            title: book.get("title")
          }
        }
      }));
    });
    return AV.Promise.all(ps);
  });
}

module.exports.deleteCollection = function(id, user_id){
  var col_query = new AV.Query('Collection');
  col_query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return col_query.first().then(function(col){
    if(col){
      var user_query = new AV.Query('_User');
      return user_query.get(col.get('user').id).then(function(user){
        if(user.get("id")!==parseInt(user_id)){
          return AV.Promise.reject("not allow");
        } else {
          col.save('deleted', true);
          return col.save();
        }
      });
    } else {
      return AV.Promise.reject("Can not find collection");
    }
  });
}

