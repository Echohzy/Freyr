var AV = require('leancloud-storage');
var _ = require('lodash');

module.exports.addMovie = function(params) {
  var movie = new AV.Object('Movie');
  for(var k in params) {
    movie.set(k, params[k]);
  }
  return movie.save().then(function(data) {
    return data.toJSON();
  });
};

module.exports.getMovie = function(id) {
  var query = new AV.Query('Movie');
   query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
   return query.first().then(function(result){
      try {
        return result.toJSON();
      } catch(e) {
        return Promise.reject("can not found");
      }
   });
};

module.exports.getMovies = function(params){
  var query = new AV.Query('Movie');
  query.notEqualTo('deleted', true);
  return query.find().then(function(movies){

    try {
      return movies.map(function(m){
        var movie = m.toJSON();
        return _.pick(movie, ["durations", "languages", "createdAt", "updatedAt", "tag", "post", "directors", "stars", "id", "original_name", "name", "types", "user_review_score", "cate"]);
      });
    } catch(e) {
      return Promise.reject("can not found");
    }
  });
}

module.exports.updateMovie = function(id, params) {
  var query = new AV.Query('Account');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(m){
    try {
      for( var k in params ) {
        m.set(k, params[k]);
      }
      return m.save().then(function(data){
        return Promise.resolve(data);
      });
    } catch (e) {
      return Promise.reject('can not found');
    }
  });
};