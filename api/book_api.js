var AV = require('leancloud-storage');
var _ = require('lodash');

module.exports.addBook = function(params) {
  var Book = AV.Object.extend('Book');
  var book = new Book();
  for (var k in params) {
    book.set(k, params[k]);
  }
  return book.save().then(function(data) {
    return Promise.resolve(data);
  });
};

module.exports.getBook = function(id) {
  var query = new AV.Query('Book');
   query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
   return query.first().then(function(result){
      return Promise.resolve(result);
   });
};

module.exports.getBooks = function(params){
  var query = new AV.Query('Book');
  query.notEqualTo('deleted', true);
  return query.find().then(function(books){
    try{
      return books.map(function(book){
        book = book.toJSON();
        return _.pick(book, ["publisher","cover","title","author","summary","cate","id","score","ISBN","price","review_count","createdAt","updatedAt"]);
      });
    }catch(error){
      return Promise.reject("can not found");
    }
  });
}

module.exports.updateBook = function(id, params) {
  var query = new AV.Query('Book');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(book){
    for( var k in params ) {
      book.set(k, params[k]);
    }
    return book.save();
  });
};