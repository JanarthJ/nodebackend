//step 1
const mongoose = require("mongoose");
const Student = require("../modal/student");
const Mark = require("../modal/mark");

//step 2
const createMark = async(req,res)=>{
    try{
        const data = req.body;
        console.log(data);
        // validation 
        
        //step 4
        // const st = await Student.create(data)
        const st = await Mark.create({
            name:"PK",
            subject1:70,
            subject2:65,
            subject3:79,
            subject4:84,
            subject5:87,
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

// property -- name, age,address, nationality
//getStudentByName
const getStudentByproperty = async(req,res)=>{
    try{
        const data =  req.body;
        //const st = await Student.findOne({name:req.body.name});
        const st = await Student.find({age:req.body.age});
        //const st = await Student.findOne({age:req.body.age});
        // const st = await Student.findOne({nationality:req.body.nationality});
        res.send({Status:"Success",data:st});
    }catch(err){
        console.log(err);
        res.send({Status:"Fail",data:err});
    }
}

const getStudentBypropertyAndUpdate = async(req,res)=>{
    try{
        const data =  req.body;
        //const st = await Student.findOne({name:req.body.name});
        const st = await Student.findOneAndUpdate({name:req.body.name},{age:req.body.age},{new:true});
        //const st = await Student.findOne({age:req.body.age});
        // const st = await Student.findOne({nationality:req.body.nationality});
        res.send({Status:"Success",data:st});
    }catch(err){
        console.log(err);
        res.send({Status:"Fail",data:err});
    }
}

const getStudentBypropertyAndReplace = async(req,res)=>{
    try{
        const data =  req.body;
        //const st = await Student.findOne({name:req.body.name});
       
      
        const st = await Student.findOneAndReplace( {name:req.body.name},{name:"PRAV",age:20,address:"Bangalore"},{new:true});
        //const st = await Student.findOne({age:req.body.age});
        // const st = await Student.findOne({nationality:req.body.nationality});
        res.send({Status:"Success",data:st});
    }catch(err){
        console.log(err);
        res.send({Status:"Fail",data:err});
    }
}

const getStudentBypropertyAndDelete = async(req,res)=>{
    try{
        const data =  req.body;
        //const st = await Student.findOne({name:req.body.name});
        const st = await Student.findOneAndDelete({name:req.body.name});
        //const st = await Student.findOne({age:req.body.age});
        // const st = await Student.findOne({nationality:req.body.nationality});
        res.send({Status:"Success",data:st});
    }catch(err){
        console.log(err);
        res.send({Status:"Fail",data:err});
    }
}

//many data
const updatemanystudents = async(req,res)=>{
    try{
        const data =  req.body;
        //const st = await Student.findOne({name:req.body.name});
        const st = await Student.updateMany({age:req.body.age},{name:"CSE"},{ isActive: true });
        //const st = await Student.findOne({age:req.body.age});
        // const st = await Student.findOne({nationality:req.body.nationality});
        res.send({Status:"Success",data:st});
    }catch(err){
        console.log(err);
        res.send({Status:"Fail",data:err});
    }
}

const deletemanystudents = async(req,res)=>{
    try{
        const data =  req.body;
        //const st = await Student.findOne({name:req.body.name});
        const st = await Student.deleteMany({ isActive: true });
        //const st = await Student.findOne({age:req.body.age});
        // const st = await Student.findOne({nationality:req.body.nationality});
        res.send({Status:"Success",data:st});
    }catch(err){
        console.log(err);
        res.send({Status:"Fail",data:err});
    }
}







//step 3
module.exports = {
    createStudent,
    //using db _id 
    getStudent,
    getStudentById,
    updateStudentByID,
    deleteStudentByID,
    //using db property 
    getStudentByproperty,
    getStudentBypropertyAndUpdate,
    getStudentBypropertyAndReplace,
    getStudentBypropertyAndDelete,
    updatemanystudents,
    deletemanystudents,

    createMark,
};

