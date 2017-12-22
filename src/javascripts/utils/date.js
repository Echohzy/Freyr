'use strict';

const getDateNumber = function(num) {
  return num < 10 ? "0" + num : num;
}

const getDateByTimestamp = function(timestamp) {
  let date = new Date(timestamp*1000);
  let t = {
    day: [],
    time: []
  }
  t.day.push(date.getFullYear());
  t.day.push(getDateNumber(date.getMonth() + 1));
  t.day.push(getDateNumber(date.getDate()));

  t.time.push(getDateNumber(date.getHours()));
  t.time.push(getDateNumber(date.getMinutes()));
  t.time.push(getDateNumber(date.getSeconds()));
  return t.day.join("-") + " " + t.time.join(":");
}


export {
  getDateByTimestamp
}