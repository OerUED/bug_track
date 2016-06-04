exports.callback = function(req, res, err, data) {
    if (err) {
        res.send({
            code: 500,
            error: err
        });
    } else {
        res.send({
            data: data,
            code: 200
        });
    }
}

exports.promiseAct = function(resolve, reject, err, data) {
    if (err) {
        reject(err);
    } else {
        resolve(data)
    }
}

exports.checkLogin = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
}

exports.checkLoginAPI = function(req, res, next) {
    if (!req.session.user) {
        res.send({
            code: 400,
            error: '未登录'
        });
    }
    next();
}

exports.transDate = function(input) {
    var t = new Date(input),
        year = t.getFullYear() - new Date().getFullYear(),
        month = t.getMonth() - new Date().getMonth(),
        day = t.getDate() - new Date().getDate(),
        hour = t.getHours() - new Date().getHours(),
        minute = t.getMinutes() - new Date().getMinutes(),
        sencond = t.getSeconds() - new Date().getSeconds();

    if (year < 0) {
        return -year + '年前';
    }

    if (month < 0) {
        return -month + '个月前';
    }

    if (day < 0) {
        return -day + '天前';
    }

    if (hour < 0) {
        return -hour + '小时前';
    }

    if (minute < 0) {
        return -minute + '分钟前';
    }
    return '刚刚';
};

exports.setParam = function (query,_escape, newString) {
    var returnString = '?';
    for(var key in query){
        if (key !== _escape) {
            returnString += key + '=' + query[key] + '&';
        }
    }
    if (newString !== '') {
        returnString += newString;
    } else {
        returnString = returnString.subString(0, returnString.length - 1);
    }
    return returnString;
}