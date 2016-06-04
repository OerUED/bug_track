var crypto = require('crypto');
var config = require('../config');
var user = require('../proxy/user');
var response = require('../tools/tool').callback;

exports.add = function(req, res, next) {
    var obj = req.body;
    var password = crypto.createHmac('sha256', config.secret)
        .update(obj.password)
        .digest('hex');

    Object.assign(obj, {
        'password': password
    });

    user.save(obj).then(function(data) {
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
        query['email'] = new RegExp(keyword); //模糊查询参数
    }

    user.list(query, options).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var obj = req.body;
    obj = Object.assign(obj, {
        'updated': Date.now
    });

    user.get(id).then(function(_res) {
        _res = Object.assign(_res, obj);
        return user.update(_res);
    }).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}


exports.delete = function(req, res) {
    var id = req.params.id;
    user.remove(id).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}

exports.get = function(req, res) {
    var id = req.params.id;
    user.get(id).then(function(data) {
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}


exports.login = function(req, res) {
    var email = req.body.email,
        password = req.body.password;

    password = crypto.createHmac('sha256', config.secret)
        .update(password)
        .digest('hex');

    user.find({
        email: email,
        password: password
    }, 1).then(function(data) {
        req.session.user = data;
        response(req, res, null, data);
    }).catch(function(err) {
        response(req, res, err, null);
    });
}

exports.logout = function(req, res) {
    req.session.user = null;
}
