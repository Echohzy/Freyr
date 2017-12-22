'use strict';

const parseUrl = function(url) {
  var reg = /([\w\%]+)=([\w\%]+)/ig;
  var result = {};
  var toString = Object.prototype.toString;
  url.replace(reg, function(fullmatch, key, value){
    var v = decodeURIComponent(value);
    var k = decodeURIComponent(key);
    if(result[k]){
      if(toString.call(result[k])==="[object Array]"){
        result[k].push((+v)||v);
      }else{
        result[k] = [result[k], (+v)||v];
      }
    }else{
      result[k] = (+v)||v;
    }
  });
  return result;
}


export {
  parseUrl
}