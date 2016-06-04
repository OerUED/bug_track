var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var DomainSchema = Schema({
    host: {
        type:String,
        unique: true
    },
    appKey: String
});

mongoose.model('Domain', DomainSchema);