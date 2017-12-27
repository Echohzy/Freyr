var AV = require('leancloud-storage');

module.exports.addBook = function(params) {
  var Book = AV.Object.extend('Book');
  var book = new Book();
  for (var k in params) {
    book.set(k, params[k]);
  }
  return book.save().then(function(data) {
    return Promise.resolve(data);
  }, function(err){
    return Promise.reject(err);
  });
};

module.exports.getBook = function(id) {
  var query = new AV.Query('Book');
   query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
   return query.first().then(function(result){
      return Promise.resolve(result);
   }, function(error) { 
      return Promise.reject(error);
   });
};

module.exports.updateBook = function(id, params) {
  var query = new AV.Query('Book');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(book){
    for( var k in params ) {
      book.set(k, params[k]);
    }
    return book.save().then(function(data){
      return Promise.resolve(data);
    }).catch(function(error) { 
      return Promise.reject(error);
    });
  }).catch(function(error){
    return Promise.reject(error);
  });
};