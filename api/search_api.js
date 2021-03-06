var AV = require('leancloud-storage');
var _ = require('lodash');


module.exports.getSearchBooks = function(keyword){
  var query = new AV.Query('Book');
  query.equalTo("title", keyword).notEqualTo('deleted', true);
  return query.find().then(function(result){
    return result;
  }).then(function(books){
    var res = [];
    books.forEach((book)=>{
      var tmp = book.toJSON();
      tmp.score = tmp.score / tmp.review_count;
      res.push(_.pick(tmp, ['ISBN', 'author', 'cover', 'updatedAt', 'id', 'price', 'publisher', 'review_count', 'score', 'summary', 'title']));
    });
    return res;
  });
}



module.exports.getSearchReviews = function(keyword){
  var query = new AV.Query('Review');
  query.equalTo('title', keyword).notEqualTo('deleted', true);
  return query.find().then(function(result){
    return result;
  }).then(function(reviews){
    var ps = []
    reviews.map(function(review){
      var user_query = new AV.Query('_User');
      ps.push(user_query.get(review.author.objectId).then(function(data){
        return data.toJSON();
      }).then(function(author){
        review = _.pick(review.toJSON(), ["like", "content", "title", "id", "score", "comment", "dislike", "updatedAt"]);
        review.author = {
          id: author.id,
          avatar: author.avatar,
          username: author.username
        };
        return review;
      }))
    });
    return Promise.all(ps);
  });
}

