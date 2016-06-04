var mongoose = require('mongoose');
var config = require('../config');
var hostname = config.host,
    dbname = config.db;
var dburl = 'mongodb://'+ hostname +'/'+dbname;

mongoose.connect(dburl, function (err) {
  if (err) {
    console.error('connect to %s error: ', dburl, err.message);
    process.exit(1);
  }
});

// models
require('./domain');
require('./log');
require('./user');

exports.Domain = mongoose.model('Domain');
exports.Log = mongoose.model('Log');
exports.User = mongoose.model('User');

