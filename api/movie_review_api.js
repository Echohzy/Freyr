var AV = require('leancloud-storage');

module.exports.addMovieReview = function(params) {
  var movieReview = new AV.Object('MovieReview');
  movieReview.set('title', params.title);
  movieReview.set('content', params.content);
  movieReview.set('score', 1);
  var author = AV.Object.createWithoutData('Account', params.account_id);
  var movie = AV.Object.createWithoutData('Movie', params.movie_id);
  movieReview.set('author', author);
  movieReview.set('movie', movie);
  return movieReview.save().then(function(data){
    return data.toJSON();
  });
};

module.exports.getMovieReview = function(id) {

  var query = new AV.Query('MovieReview');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(result){
    try {
      var res = result.toJSON();
      return res;
    } catch (e) {
      return Promise.reject('can not found');
    }
  }).then(function(movieReview){
    var accountQuery = new AV.Query('Account');
    return accountQuery.get(movieReview.author.objectId).then(function(account) {
      movieReview.author = {
        id: account.get('id'),
        nickanme: account.get('nickname'),
        avatar: account.get('avatar')
      };
      return movieReview;
    });
  }).then(function(movieReview) {
    var movieQuery = new AV.Query('Movie');
    return  movieQuery.get(movieReview.movie.objectId).then(function(movie) {
      movieReview.movie = {
        name: movie.get('name'),
        original_name: movie.get('original_name'),
        cate: movie.get('cate'),
        types: movie.get('types'),
        user_review_count: movie.get('user_review_count'),
        summary: movie.get('summary')
      };
      return movieReview;
    });
  });
};

module.exports.updateMovieReview = function(id, params) {
  var query = new AV.Query('Account');
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