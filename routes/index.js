'use strict';

var path = require('path');

module.exports = function(app) {

  app.use('/domain', require('./domain'));
  app.use('/log', require('./log'));
  app.use('/user', require('./user'));

  app.use('/*', function (req,res,next) {
    return res.json({code: 200, data:'咩～'});
  })
};
