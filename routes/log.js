'use strict';

var express = require('express');
var auth = require('../auth');
var controller = require('../controllers/log');

var router = express.Router();
//后台管理
router.post('/add',auth.hasRole,controller.add);
router.get('/list',auth.hasRole,controller.list);
router.delete('/:id', auth.hasRole, controller.delete);
router.get('/:id/info', auth.hasRole, controller.get);
module.exports = router;