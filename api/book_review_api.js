var AV = require('leancloud-storage');

module.exports.addBookReview = function(params) {
  var bookReview = new AV.Object('BookReview');
  bookReview.set('title', params.title);
  bookReview.set('content', params.content);
  bookReview.set('score', params.score);
  var author = AV.Object.createWithoutData('Account', params.account_id);
  var book = AV.Object.createWithoutData('Movie', params.book_id);
  bookReview.set('author', author);
  bookReview.set('book', book);
  return bookReview.save().then(function(data){
    return data.toJSON();
  });
};

module.exports.getBookReview = function(id) {

  var query = new AV.Query('BookReview');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(result){
    try {
      var res = result.toJSON();
      return res;
    } catch (e) {
      return Promise.reject('can not found');
    }
  }).then(function(bookReview){
    var accountQuery = new AV.Query('Account');
    return accountQuery.get(bookReview.author.objectId).then(function(account) {
      bookReview.author = {
        id: account.get('id'),
        nickanme: account.get('nickname'),
        avatar: account.get('avatar')
      };
      return bookReview;
    });
  }).then(function(bookReview) {
    var movieQuery = new AV.Query('Movie');
    return  movieQuery.get(bookReview.movie.objectId).then(function(movie) {
      bookReview.movie = {
        name: movie.get('name'),
        original_name: movie.get('original_name'),
        cate: movie.get('cate'),
        types: movie.get('types'),
        user_review_count: movie.get('user_review_count'),
        summary: movie.get('summary')
      };
      return bookReview;
    });
  });
};

module.exports.updateBookReview = function(id, params) {
  var query = new AV.Query('BookReview');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(account){
    for( var k in params ) {
      account.set(k, params[k]);
    }
    return account.save().then(function(data){
      return data;
    });
  });
};