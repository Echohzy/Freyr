var AV = require('leancloud-storage');
var _ = require('lodash');

module.exports.addBorrow = function(params){
  var Borrow = AV.Object.extend('Borrow');
  var borrow = new Borrow();
  var up, bp;
  var user_query = new AV.Query("_User");
  user_query.equalTo("id", parseInt(params.user_id)).notEqualTo('deleted', true);
  return user_query.first().then(function(user){
    return AV.Object.createWithoutData('_User', user.id); 
  }).then(function(userPointer){
    borrow.set('user', userPointer);
    var book_query = new AV.Query("Book");
    book_query.equalTo("id", parseInt(params.book_id)).notEqualTo('deleted', true);
    return book_query.first();
  }).then(function(book){
    bp = AV.Object.createWithoutData('Book', book.id);
    borrow.set('book', bp);
    return borrow.save();
  }).then(function(borrow){
    return borrow.toJSON();
  });
}


module.export.deleteBorrow = function(id, user_id){
  var borrow_query = new AV.Query('Borrow');
  var b = borrow;
  borrow_query.equalTo('id', id).notEqualTo('deleted', true);
  return borrow_query.first().then(function(borrow){
    var user_query = new AV.Query("_User");
    user_query.get(borrow.user.id);
  }).then(function(user){
    if(user.get("id")!==parseInt(user_id)){
      return Promise.reject("Can not delete borrow!");
    } else {
      b.set("deleted", true);
      return b.save();
    }
  });
}
