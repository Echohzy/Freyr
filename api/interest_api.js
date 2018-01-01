var AV = require('leancloud-storage');
var _ = require('lodash');

module.exports.addInterest = function(params) {
  var interest = AV.Object('Interest');
  interest.set('interest_type', params.interest_type);
  if (params.interest_type==="movie") {
    var movie = AV.Object.createWithoutData('Movie', params.movie_id);
    interest.set('movie', movie);
  } else if (params.interest_type==="book") {
    var book = AV.Object.createWithoutData('Book', params.book_id);
    interest.set('book', book);
  }
  return interest.save().then(function(data){
    return data.toJSON();
  });
}

module.exports.getInterest = function(id) {
  var query = new AV.Query('Interest');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(result){
    try {
      return result.toJSON();
    } catch (e) {
      return Promise.reject('can not found');
    }
  }).then(function(interest){
    if(interest.interest_type==="movie"){
      var query = new AV.Query('Movie');
      return query.get(interest.movie.objectId).then(function(movie) {
        interest.movie = _.pick(movie,['name', 'original_name','cate','types', 'user_review_count', 'summary']);
        return interest;
      });
    }
    return interest;
  }).then(function(interest){
    if(interest.interest_type==='book'){
      var query = new AV.Object('Book');
      return query.get(interest.book.objectId).then(function(book) {
        interest.book = _.pick(book, ['title', 'cover', 'publisher','id', 'author']);
        return interest;
      });
    }
    return interest;
  });
}


module.exports.updateInterest = function(id, params){
  var query = new AV.Query('Interest');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(interest){
    for (var k in params) {
      interest.set(k, params[k]);
    }
    return interest.save().then(function(data){
      return data.toJSON();
    });
  });
}

