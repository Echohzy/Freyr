var AV = require('leancloud-storage');
var _ = require('lodash');

module.exports.addComment = function(params) {
  var comment = new AV.Object('Comment');
  var userQuery = new AV.Query('_User');
  var currentReview;
  var currentUser;
  userQuery.equalTo("id", parseInt(params.user_id)).notEqualTo("deleted", true);
  return userQuery.first().then(function(user){
    currentUser = user.toJSON();
    return AV.Object.createWithoutData('_User', user.id);
  }).then(function(user_pointer){
    var reviewQuery = new AV.Query('Review');
    reviewQuery.equalTo("id", parseInt(params.review_id)).notEqualTo("deleted", true);
    return reviewQuery.first().then(function(review){
      currentReview = review.toJSON();
      var review_pointer = AV.Object.createWithoutData('Review', review.id);
      comment.set('creator', user_pointer);
      comment.set('review', review_pointer);
      comment.set("content", params.content);
      return comment.save();
    });
  }).then(function(comment){
    var query = new AV.Query("Comment");
    return query.get(comment.id);
  }).then(function(comment){
    var co = {
      id: comment.get('id'),
      content: comment.get('content'),
      updatedAt: comment.get('updatedAt')
    };
    co.review_id = params.review_id;
    co.creator = {
      id: currentUser.id,
      avatar: currentUser.avatar,
      username: currentUser.username
    };
    return co;
  });
}

module.exports.getCommentsByReview = function(review_id) {
  var reviewQuery = new AV.Query('Review'); 
  reviewQuery.equalTo("id", parseInt(review_id)).notEqualTo("deleted", true);
  return reviewQuery.first().then(function(review){
    return AV.Object.createWithoutData('Review', review.id);
  }).then(function(reviewPointer){
    var commentQuery = new AV.Query("Comment");
    commentQuery.equalTo("review", reviewPointer).notEqualTo("deleted", true);
    return commentQuery.find();
  }).then(function(comments){
    var ps = [];
    comments.map((c)=>{
      c = c.toJSON();
      var userQuery  = new AV.Query("_User");
      ps.push(userQuery.get(c.creator.objectId).then(function(user){
        
        delete c['review'];
        c.creator = {
          id: user.get('id'),
          avatar: user.get('avatar'),
          username: user.get('username')
        };
        return c;
      }) );
    });
    return Promise.all(ps);
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