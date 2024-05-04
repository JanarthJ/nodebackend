//step 1
const mongoose = require("mongoose");
const Student = require("../modal/student");

//step 2
const createStudent = async(req,res)=>{
    try{
        const data = req.body;
        console.log(data);
        // validation 
        
        //step 4
        // const st = await Student.create(data)
        const st = await Student.create({
            name:data.name,
            age:data.age,
            address:data.address,
            nationality:"Indian"
        }).then((result)=>{
            console.log(result);
            res.send({status:"Success",data:result});
        })
        .catch((err)=>{
            console.err(err);
            res.send({status:"Fail",data:err});
        })
    }catch(err){
        console.err(err);
    }
}

const getStudent = async(req,res)=>{
    try{
        const st = await Student.find();
        res.send({Status:"Success",data:st});
    }catch(err){
        console.log(err);
        res.send({Status:"Fail",data:err});
    }
}

const getStudentById = async(req,res)=>{
    try{
        const data =  req.body;
        const st = await Student.findById(data._id);
        res.send({Status:"Success",data:st});
    }catch(err){
        console.log(err);
        res.send({Status:"Fail",data:err});
    }
}

const updateStudentByID = async(req,res)=>{
    try{
        const data = req.body;
        console.log(data);
    
        
        const st = await Student.findByIdAndUpdate(data._id,{address:data.address})
        .then(async(result)=>{
            console.log(result);
            //this line is for getting updated data in table
            const updatedStudent = await Student.findById(data._id);
            res.send({status:"Success",data:updatedStudent});
        })
        .catch((err)=>{
            console.err(err);
            res.send({status:"Fail",data:err});
        })
    }catch(err){
        console.err(err);
    }
}

const deleteStudentByID = async(req,res)=>{
    try{
        const data = req.body;
        console.log(data);
        // validation 
        
        const st = await Student.findByIdAndDelete(data._id)
        .then(async(result)=>{
            console.log(result);
            // const updatedStudent = await Student.findById(data._id);
            res.send({status:"Success",data:result});
        })
        .catch((err)=>{
            console.err(err);
            res.send({status:"Fail",data:err});
        })
    }catch(err){
        console.err(err);
    }
}


//step 3
module.exports = {
    createStudent,
    getStudent,
    getStudentById,
    updateStudentByID,
    deleteStudentByID
};

