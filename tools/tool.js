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