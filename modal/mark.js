//step 1
const mongoose = require("mongoose");

//step 2
const markSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subject1:{
        type:Number,
        required:true
    },
    subject2:{
        type:Number,
        required:true
    },
    subject3:{
        type:Number,
        required:true
    },
    subject4:{
        type:Number,
        required:true
    },
    subject5:{
        type:Number,
        required:true
    },
});

//step 3
const Mark = mongoose.model('Mark',markSchema);

//step 4
module.exports = Mark;