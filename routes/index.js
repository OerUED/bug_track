'use strict';

var path = require('path');

module.exports = function(app) {

  app.use('/domain', require('./domain'));
  app.use('/log', require('./log'));
  app.use('/user', require('./user'));
  app.use('/now', function(req, res, next) {
    return res.json({
      status: 1,
      data: new Date().getTime(),
      details: null,
      msg: ""
    });
  })
  app.use('/*', function(req, res, next) {
    return res.json({ code: 200, data: '咩～' });
  })
};
