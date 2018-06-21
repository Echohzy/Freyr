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
  var book = AV.Object.createWithoutData('Book', params.book_id);
  review.set('book', book);
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
    var accountQuery = new AV.Query('_User');
    return accountQuery.get(review.author.objectId).then(function(account) {
      review.author = _.pick(account.toJSON(), ['id', 'username', 'avatar']);
      return review;
    });
  }).then(function(review){
    var bookQuery = new AV.Query('Book');
    return bookQuery.get(review.book.objectId).then(function(book) {
      review.book = _.pick(book.toJSON(), ['publisher', 'cover', 'title', 'author', 'summary', 'cate', 'id', 'score', 'ISBN', 'price', 'review_count']);
      return review;
    });
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
    var book_pointer = AV.Object.createWithoutData('Book', bookId);
    r_query.equalTo("book", book_pointer).notEqualTo('deleted', true);
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
  }).then(function(reviews){
    var ps = [];

    reviews.map(function(r){
      var user_query = new AV.Query('_User');
      ps.push(user_query.get(r.author.objectId).then(function(data){
        return data.toJSON();
      }).then(function(author){
        r.author = {
            id: author.id,
            avatar: author.avatar,
            username: author.username
        }
        return r;
      }));
    });
    return Promise.all(ps);
  });
}


module.exports.likeOrDislikeReview = function(user_id, review_id, type){
  var userQuery = new AV.Query("_User");
  var currentReview;
  var userPointer;
  var reviewPointer;
  userQuery.equalTo("id", parseInt(user_id)).notEqualTo('deleted', true);
  return userQuery.first().then(function(user){
    return user.id;
  }).then(function(user_id){
    var reviewQuery = new AV.Query("Review");
    reviewQuery.equalTo("id", parseInt(review_id)).notEqualTo("deleted", true);
    return reviewQuery.first();
  }).then(function(review){
      currentReview = review;
      userPointer = AV.Object.createWithoutData('_User', user_id);
      reviewPointer = AV.Object.createWithoutData('Review', review.id);
      var likeQuery = new AV.Query('LikeRelation');
      likeQuery.equalTo("user", userPointer).equalTo('review', reviewPointer).equalTo('type', type);
      return likeQuery.first();
  }).then(function(like){
    if(like){
      return Promise.reject("不能重复操作");
    } else {
      var like = new AV.Object('LikeRelation');
      like.set('user', userPointer);
      like.set('review', reviewPointer);
      like.set('type', type);
      return like.save();
    }
  }).then(function(){
    var current = currentReview.get(type) + 1;
    currentReview.set(type, current);
    return currentReview.save();
  }).then(function(review){
    var review = review.toJSON();
    return _.pick(review, ["id", "like", "dislike"]);
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