var AV = require('leancloud-storage');

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