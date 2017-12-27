var AV = require('leancloud-storage');

module.exports.addMovieReview = function(params) {
  var movieReview = new AV.Object('MovieReview');
  movieReview.set('title', 'Test');
  movieReview.set('summary', 'test');
  
  var author = AV.Object.createWithoutData('Account', '5a43537444d9040038d2e8d5');
  movieReview.set('author', author);
  
  return movieReview.save().then(function(data){
    return Promise.resolve(data);
  }).catch(function(error){
    return Promise.reject(error);
  })
};

module.exports.getMovieReview = function(id) {
  var query = new AV.Query('Account');
   query.equalTo('id', parseInt(id)).notEqualTo('deleted', true);
   return query.first().then(function(result){
      return Promise.resolve(result);
   }, function(error) { 
      return Promise.reject(error);
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
      return Promise.resolve(data);
    }).catch(function(error) { 
      return Promise.reject(error);
    });
  }).catch(function(error){
    return Promise.reject(error);
  });
};