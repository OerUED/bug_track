"use strict";

var models = require('../models');
var User = models.User;
var promiseAct = require('../tools/tool').promiseAct;


var UserDAO = function() {};
//保存用户
UserDAO.prototype.save = function(obj) {
    var instance = new User(obj);
    return new Promise(function(resolve, reject) {
        instance.save(function(err,data) {
            promiseAct(resolve, reject, err,data);
        });
    });
}

//更新用户
UserDAO.prototype.update = function(query) {
    return new Promise(function(resolve, reject) {
        User.findByIdAndUpdate(query._id, query, {}, function(err, data) {
            promiseAct(resolve, reject, err, data);
        });
    });
}

//获取数量
UserDAO.prototype.count = function(query) {
    return new Promise(function(resolve, reject) {
        User.count(query, function(err, count) {
            promiseAct(resolve, reject, err, count);
        });
    });
}

//获取用户列表
UserDAO.prototype.list = function(query, opt) {
    return new Promise(function(resolve, reject) {
        Promise.all([
            new UserDAO().count(query),
            new Promise(function(resolve, reject) {
                User.find(query, {}, opt)
                .select('-password')
                .exec(function(err, data) {
                    promiseAct(resolve, reject, err, data);
                });
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

//根据id获取用户
UserDAO.prototype.get = function(id) {
    return new Promise(function(resolve, reject) {
        User.findOne({
            _id: id
        })
        .select('-password')
        .exec(function(err, data) {
            promiseAct(resolve, reject, err, data);
        });
    });
}

//根据query获取用户
UserDAO.prototype.find = function(query,needPass) {
    let queryPass = needPass ? '' : '-password';
    return new Promise(function(resolve, reject) {
        User.findOne(query)
        .select(queryPass)
        .exec(function(err, data) {
            if(data){
                resolve(data);
            }else{
                reject(new Error('用户没有找到'));
            }
        });
    });
}

//删除用户
UserDAO.prototype.remove = function(id) {
    return new Promise(function(resolve, reject) {
        User.remove({
            _id: id
        }, function(err, data) {
            promiseAct(resolve, reject, err);
        });
    });
}

module.exports = new UserDAO();