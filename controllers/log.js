var config = require('../config');
var log = require('../proxy/log');
var domain = require('../proxy/domain');
var response = require('../tools/tool').callback;

exports.add = function(req, res, next) {
    var obj = req.body;
    // var clientHost = req.headers.origin.replace(/http:\/\//, '').split(':')[0];
    var query = { appKey: obj.appKey };
    domain.count(query).then(_res => {
        if (_res > 0) {
            log.save(obj).then(function(data) {
                response(req, res, null, {});
            }).catch(function(err) {
                response(req, res, err, null);
            });
        } else {
            res.json({ status: 1, code: 201, content: 'appKey不匹配' });
        }
    });
}

exports.list = function(req, res) {
    var size = parseInt(req.query.size) || 20;
    var page = parseInt(req.query.page) || 1;
    page = page > 0 ? page : 1;
    var keyword = req.query.keyword ? req.query.keyword : '';
    var level = req.query.level;
    var type = req.query.type;
    var appKey = req.query.appKey;
    var startTime = req.query.startTime;
    var endTime = req.query.endTime;

    var options = {
        skip: (page - 1) * size,
        limit: size,
        sort: '-_id'
    };

    var query = {};

    if (keyword) {
        query['content'] = new RegExp(keyword); //模糊查询参数
    }

    if (level) {
        query['level'] = level;
    }

    if (type) {
        query['type'] = type;
    }

    if (appKey) {
        query['appKey'] = appKey;
    }

    if(!startTime && endTime) {
        startTime = '1970-01-01 00:00';
    }

    if(!endTime && startTime) {
        endTime = '3000-01-01 00:00';
    }

    if(startTime && endTime){
        query['createAt'] = {
            '$gte': new Date(startTime),
            '$lt':new Date(endTime)
        };
    }



    log.list(query, options).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;
    log.removeByQuery({
        _id: id
    }).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}

exports.deleteByAppKey = function(req,res){
    var appKey = req.params.appKey;
    log.removeByQuery({
        appKey: appKey
    }).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}

exports.deleteByType = function(req,res){
    // type: 1 删除页面错误 0 删除服务端错误
    var type = req.params.type;
    var content = type == 1 ? new RegExp('pageError') : new RegExp('reqSerError')
    log.removeByQuery({
        content: content
    }).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}

exports.get = function(req, res) {
    var id = req.params.id;
    log.get(id).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}
