var AV = require('leancloud-storage');
var _ = require('lodash');


module.exports.uploadImage = function(name, file){
  var image = new AV.File(name, file);
  return image.save().then(function(file){
    return file.url();
  });
}