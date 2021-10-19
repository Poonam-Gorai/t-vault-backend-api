const mongoose = require('mongoose');
//creating schema
const SafeListSchema = new mongoose.Schema({
    safename:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    secrets:{
        type:Array,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('mytable',SafeListSchema);