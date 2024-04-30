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

//step 3
module.exports = {
    createStudent,
    getStudent
};

