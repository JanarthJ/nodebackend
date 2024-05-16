//step 1
const mongoose = require("mongoose");

//step 2
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,        
    },
    nationality:{
        type:String
    }
});

//step 3
const Student = mongoose.model('Student',studentSchema);

//step 4
module.exports = Student;