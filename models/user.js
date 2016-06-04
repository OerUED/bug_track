/**
 * 用户表
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = Schema({
  nickname:String,
  email: {
    type: String,
    lowercase: true
  },
  password: String,
  role: {
    type : String ,
    default : 'user'
  },
  status:{
    type:Number,
    default:0
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

UserSchema
  .virtual('userInfo')
  .get(function() {
    return {
      'nickname': this.nickname,
      'role': this.role,
      'email': this.email,
      'status':this.status,
      'created':this.created
    };
  });


mongoose.model('User', UserSchema);
