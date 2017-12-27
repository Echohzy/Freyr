var AV = require('leancloud-storage');

module.exports.addMovie = function(params) {
  var Movie = AV.Object.extend('Movie');
  var movie = new Movie();
  for(var k in params) {
    movie.set(k, params[k]);
  }
  return movie.save().then(function(data) {
    return Promise.resolve(data);
  }, function(err){
    return Promise.reject(err);
  });
};

module.exports.getMovie = function(id) {
  var query = new AV.Query('Movie');
   query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
   return query.first().then(function(result){
      return Promise.resolve(result);
   }, function(error) { 
      return Promise.reject(error);
   });
};

module.exports.updateMovie = function(id, params) {
  var query = new AV.Query('Account');
  query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
  return query.first().then(function(m){
    for( var k in params ) {
      m.set(k, params[k]);
    }
    return m.save().then(function(data){
      return Promise.resolve(data);
    }).catch(function(error) { 
      return Promise.reject(error);
    });
  }).catch(function(error){
    return Promise.reject(error);
  });
};