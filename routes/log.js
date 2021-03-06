'use strict';

var express = require('express');
var auth = require('../auth');
var controller = require('../controllers/log');

var router = express.Router();
//后台管理
router.post('/add',controller.add);
router.get('/list',controller.list);
router.delete('/:id', auth.hasRole, controller.delete);
router.delete('/appKey/:appKey',auth.hasRole, controller.deleteByAppKey);
router.delete('/type/:type',auth.hasRole, controller.deleteByType);
router.get('/:id/info', auth.hasRole, controller.get);
module.exports = router;