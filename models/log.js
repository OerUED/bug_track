var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var LogSchema = Schema({
  appKey: String,
  type: Number,
  level: Number,
  content: String,
  createAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Log', LogSchema);