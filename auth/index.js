'use strict';



/**
 * 验证用户权限
 */
function hasRole(req,res,next) {
  // res.send('14134');
  next();
}
exports.hasRole = hasRole;
