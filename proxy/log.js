var models = require('../models');
var Log = models.Log;
var promiseAct = require('../tools/tool').promiseAct;


var LogDAO = function() {};
//保存文章
LogDAO.prototype.save = function(obj) {
    var instance = new Log(obj);
    return new Promise(function(resolve, reject) {
        instance.save(function(err,res) {
            promiseAct(resolve, reject, err,res);
        });
    });
}

//更新类型
LogDAO.prototype.update = function(query) {
    return new Promise(function(resolve, reject) {
        Log.findByIdAndUpdate(query._id, query, {}, function(err,data) {
            promiseAct(resolve, reject, err,data);
        });
    });
}

//获取数量
LogDAO.prototype.count = function(query) {
    return new Promise(function(resolve, reject) {
        Log.count(query, function(err, count) {
            promiseAct(resolve, reject, err, count);
        });
    });
}

//获取类型列表
LogDAO.prototype.list = function(query, opt) {
    return new Promise(function(resolve, reject) {
        Promise.all([
            new LogDAO().count(query),
            new Promise(function(resolve, reject) {
                Log.find(query, {}, opt, function(err, data) {
                    promiseAct(resolve, reject, err, data);
                })
            })
        ]).then(function(res) {
            var data = {};
            data.count = res[0];
            data.list = res[1];
            resolve(data);
        }).catch(function(err) {
            reject(err);
        });
    })
}

//根据id获取类型
LogDAO.prototype.get = function(id) {
    return new Promise(function(resolve, reject) {
        Log.findOne({
            _id: id
        }, function(err, data) {
            promiseAct(resolve, reject, err, data);
        });
    });
}

//删除类型
LogDAO.prototype.remove = function(id) {
    return new Promise(function(resolve, reject) {
        Log.remove({
            _id: id
        }, function(err, data) {
            promiseAct(resolve, reject, err);
        });
    });
}

module.exports = new LogDAO();