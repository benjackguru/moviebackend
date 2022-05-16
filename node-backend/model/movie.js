// create schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Movie=new Schema({
    name:{
        type:String
    },
    quality:{
        type:String
    },
    language:{
        type:String
    },
    lq:{
        type:String
    },
    mq:{
        type:String
    },
    hq:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
},{
    collection:'movie'
}
)

//export module
module.exports = mongoose.model('Movie', Movie)