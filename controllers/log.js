var config = require('../config');
var log = require('../proxy/log');
var response = require('../tools/tool').callback;

exports.add = function(req, res, next) {
    var obj = req.body;

    log.save(obj).then(function(data) {
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
    var level = req.body.level;
    var type = req.body.type;
    var appkey = req.body.appkey;

    var options = {
        skip: (page - 1) * size,
        limit: size,
        sort: '-_id'
    };

    var query = {};

    if (keyword) {
        query['host'] = new RegExp(keyword); //模糊查询参数
    }

    if (level) {
        query['level'] = level;
    }

    if (type) {
        query['type'] = type;
    }

    if (appkey) {
        query['appkey'] = appkey;
    }

    log.list(query, options).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;
    log.remove(id).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}

exports.get = function(req, res) {
    var id = req.params.id;
    log.get(id).then(function(data){
        response(req, res, null, data);
    }).catch(function(err){
        response(req, res, err, null);
    });
}
