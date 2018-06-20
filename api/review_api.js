var AV = require('leancloud-storage');
var _ = require('lodash');

module.exports.addReview = function(params) {
  var review = new AV.Object('Review');
  review.set('title', params.title);
  review.set('content', params.content);
  review.set('score', params.score);
  review.set('type', params.type);
  var author = AV.Object.createWithoutData('Account', params.account_id);
  review.set('author', author);
  if (params.type === 'movie') {
    var movie = AV.Object.createWithoutData('Movie', params.movie_id);
    review.set('movie', movie);
  } else if (params.type === 'book') {
    var book = AV.Object.createWithoutData('Book', params.book_id);
    review.set('book', book);
  }
  return review.save().then(function(data){
    return data.toJSON();
  });
};

module.exports.getReview = function(id) {

  var query = new AV.Query('Review');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(result){
    try {
      var res = result.toJSON();
      return res;
    } catch (e) {
      return Promise.reject('can not found');
    }
  }).then(function(review){
    var accountQuery = new AV.Query('Account');
    return accountQuery.get(review.author.objectId).then(function(account) {
      review.author = _.pick(account, ['id', 'nickname', 'avatar']);
      return review;
    });
  }).then(function(review) {
    if (review.type==="movie") {
      var movieQuery = new AV.Query('Movie');
      return movieQuery.get(review.movie.objectId).then(function(movie) {
        review.movie = _.pick('movie', ['id', 'name', 'original_name', 'user_review_count', 'types', 'summary', 'stars', 'directors', 'post', 'tag', 'durations', 'languages']);
        return review;
      });
    }
    return review;
  }).then(function(review){
    if (review.type === 'book') {
      var bookQuery = new AV.Query('Book');
      return bookQuery.get(review.book.objectId).then(function(book) {
        review.book = _.pick(book, ['publisher', 'cover', 'title', 'author', 'summary', 'cate', 'id', 'score', 'ISBN', 'price', 'review_count']);
        return review;
      });
    }
    return review;
  });
};


module.exports.getBookReviews = function(book_id) {
  var query = new AV.Query('Book');
  query.equalTo('id', parseInt(book_id)).notEqualTo('deleted', true);

  return query.first().then(function(book){
    book = book.toJSON();
    return book.objectId;
  }).then(function(bookId){
    var r_query = new AV.Query('Review');
    r_query.equalTo("book", bookId).notEqualTo('deleted', true);
    return r_query.find();
  }).then(function(reviews){
    try{  
      return reviews.map(function(review){
        review = review.toJSON();
        return _.pick(review, ["like", "content", "title", "author", "id", "score", "comment", "dislike", "updatedAt"]);
      });
    }catch(error){
      return Promise.reject("can not found");
    }
  });
}

module.exports.updateReview = function(id, params) {
  var query = new AV.Query('Review');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(review){
    for (var k in params) {
      review.set(k, params[k]);
    }
    return review.save().then(function(data){
      return data.toJSON();
    });
  });
};