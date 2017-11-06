'use strict';

var fetchRaw = require('./lib/fetchRaw');
var parseRaw = require('./lib/parseRaw');

module.exports = function(username, password, callback) {
  fetchRaw(username, password, localCallback);
  function localCallback(err, bodyArr) {
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, parseRaw(bodyArr));
    }
  }
};
