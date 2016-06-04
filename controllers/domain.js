var crypto = require('crypto');
var config = require('../config');
var domain = require('../proxy/domain');
var response = require('../tools/tool').callback;

exports.add = function(req, res, next) {
    var obj = req.body;
    var appKey = crypto.createHmac('sha256', config.secret)
        .update(obj.host)
        .digest('hex');

    obj.appKey = appKey;
    domain.save(obj).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}

exports.list = function(req, res) {
    var size = parseInt(req.body.size) || 20;
    var page = parseInt(req.body.page) || 1;
    page = page > 0 ? page : 1;
    var keyword = req.body.keyword ? req.body.keyword : '';

    var options = {
        skip: (page - 1) * size,
        limit: size,
        sort: '-_id'
    };

    var query = {};

    if (keyword) {
        query['host'] = new RegExp(keyword); //模糊查询参数
    }

    domain.list(query, options).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}

exports.update = function(req, res) {

}


exports.delete = function(req, res) {
    var id = req.params.id;
    domain.remove(id).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}

exports.get = function(req, res) {
    var id = req.params.id;
    domain.get(id).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}
