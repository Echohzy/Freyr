var AV = require('leancloud-storage');
var _ = require('lodash');

module.exports.addReview = function(params) {
  var review = new AV.Object('Review');
  var userQuery = new AV.Query("_User");
  var currentUser;
  var up;
  userQuery.equalTo("id", parseInt(params.author_id)).notEqualTo('deleted', true);
  return userQuery.first().then(function(user){
    currentUser = user;
    return AV.Object.createWithoutData('_User', user.id);
  }).then(function(userPointer){
    up = userPointer;
    var bookQuery = new AV.Query('Book');
    bookQuery.equalTo("id", parseInt(params.book_id)).notEqualTo('deleted', true);
    return bookQuery.first();
  }).then(function(book){
    book.set('score', book.get('score') + params.score);
    book.set('review_count', book.get('review_count')+1);
    return book.save();
  }).then(function(book){
    var bp = AV.Object.createWithoutData('Book', book.id);
    review.set('title', params.title);
    review.set('content', params.content);
    review.set('score', params.score);
    review.set('cover', params.cover);
    review.set('author', up);
    review.set('book', bp);
    return review.save();
  }).then(function(review){
    var reviewQuery = new AV.Query("Review");
    return reviewQuery.get(review.id);
  }).then(function(review){
    review = review.toJSON();
    var r = {
      id: review.id,
      title: review.title,
      content: review.content,
      cover: review.cover,
      author: {
        id: currentUser.get('id'),
        avatar: currentUser.get('avatar'),
        username: currentUser.get('username')
      }
    }
    return r;
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
      return _.pick(review, ["book", 'author', 'comment', 'content', 'updatedAt', 'dislike', 'id', 'like', 'score', 'title', 'cover']);
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

module.exports.getReviewsByUserId = function(user_id){
  var user_query = new AV.Query('_User');
  var user = {};
  user_query.equalTo('id', parseInt(user_id)).notEqualTo('deleted', true);
  return user_query.first().then(function(user){
    return user.toJSON();
  }).then(function(u){
    var review_query = new AV.Query('Review');
    var user_pointer = AV.Object.createWithoutData('_User', u.objectId);
    user = _.pick(u, ['id', 'avatar', 'username']);
    review_query.equalTo("author", user_pointer).notEqualTo('deleted', true);
    return review_query.find();
  }).then(function(reviews){
    var res = [], tmp;

    reviews.forEach(function(r){
      tmp = _.pick(r.toJSON(), ["like", "content", "title", "id", "score", "comment", "dislike", "updatedAt"]);
      tmp.author = user;
      res.push(tmp);
    });

    return res;
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
    if(review.get("score") !== params.score) {
      var bookQuery = new AV.Query('Book');
      bookQuery.equalTo('id', parseInt(params.book_id)).notEqualTo('deleted', true);
      return bookQuery.first().then(function(book){
        book.set('score', book.get('score') - review.get('score') + params.score);
        return book.save().then(function(){
          return review;
        });
      });
    } else {
      return review;
    }
  }).then(function(review){
    for (var k in params) {
      review.set(k, params[k]);
    }
    return review.save();
  }).then(function(review){
    return _.pick(review.toJSON(), Object.keys(params));
  });
};


module.exports.deleteReview = function(id){
  var query = new AV.Query('Review');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(review){
    var bookQuery = new AV.Query("Book");
    return bookQuery.get(review.get("book").id).then(function(book){
      book.set('score', book.score-review.score);
      book.set('review_count', book.get('review_count') - 1);
      return book.save().then(function(){
        return review;
      }); 
    });
  }).then(function(review){
    review.set('deleted',true);
    return review.save();
  });
}