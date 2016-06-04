var models = require('../models');
var Domain = models.Domain;
var promiseAct = require('../tools/tool').promiseAct;


var DomainDAO = function() {};
//保存类型
DomainDAO.prototype.save = function(obj) {
    var instance = new Domain(obj);
    return new Promise(function(resolve, reject) {
        instance.save(function(err,res) {
            promiseAct(resolve, reject, err,res);
        });
    });
}

//更新类型
DomainDAO.prototype.update = function(query) {
    return new Promise(function(resolve, reject) {
        Domain.findByIdAndUpdate(query._id, query, {}, function(err,data) {
            promiseAct(resolve, reject, err,data);
        });
    });
}

//获取数量
DomainDAO.prototype.count = function(query) {
    return new Promise(function(resolve, reject) {
        Domain.count(query, function(err, count) {
            promiseAct(resolve, reject, err, count);
        });
    });
}

//获取类型列表
DomainDAO.prototype.list = function(query, opt) {
    return new Promise(function(resolve, reject) {
        Promise.all([
            new DomainDAO().count(query),
            new Promise(function(resolve, reject) {
                Domain.find(query, {}, opt, function(err, data) {
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
DomainDAO.prototype.get = function(id) {
    return new Promise(function(resolve, reject) {
        Domain.findOne({
            _id: id
        }, function(err, data) {
            promiseAct(resolve, reject, err, data);
        });
    });
}

//删除类型
DomainDAO.prototype.remove = function(id) {
    return new Promise(function(resolve, reject) {
        Domain.remove({
            _id: id
        }, function(err, data) {
            promiseAct(resolve, reject, err);
        });
    });
}

module.exports = new DomainDAO();