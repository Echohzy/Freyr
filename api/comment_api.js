var AV = require('leancloud-storage');

module.exports.addComment = function(params) {
  var comment = new AV.Object('Comment');
  comment.set('content', params.content);
  var creator = AV.Object.createWithoutData('Account', params.user_id);
  collection.set('creator', creator);
  var review = AV.Object.createWithoutData('Review', params.review_id);
  collection.set('review', review);
  return collection.save().then(function(data){
    return data.toJSON();
  });
}

module.exports.getCommentsByReview = function(review_id) {
  var query = new AV.Query('Comment');
  query.contais('review', review_id).notEqualTo('deleted', true);
  return query.then(function(results){
    return results.toJSON();
  });
}

module.exports.updateComment = function(id, params) {
  var query = new AV.Query('Comment');
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