'use strict';



/**
 * 验证用户权限
 */
function hasRole(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.json({ code: 401, content: "未授权" });
    }
}
exports.hasRole = hasRole;
