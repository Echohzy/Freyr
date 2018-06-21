'use strict';

const getDateNumber = function(num) {
  return num < 10 ? "0" + num : num;
}

const getDateByTimestamp = function(timestamp, format="YYYY-MM-DD hh-mm-ss") {
  let date = new Date(timestamp);
  let YYYY = date.getFullYear();
  let MM = getDateNumber(date.getMonth() + 1);
  let DD = getDateNumber(date.getDate());
  let hh = getDateNumber(date.getHours());
  let mm = getDateNumber(date.getMinutes());
  let ss = getDateNumber(date.getSeconds());
  return format.replace("YYYY", YYYY).replace("MM", MM).replace("DD", DD).replace("hh", hh).replace('mm', mm).replace('ss', ss);
}


export {
  getDateByTimestamp
}