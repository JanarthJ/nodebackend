//step 1
const mongoose = require("mongoose");
const Student = require("../modal/student");
const Mark = require("../modal/mark");

//step 2 
const getstudentuser = async(req,res)=>{
    try{
        const data =  req.body;        
        const st = await Student.aggregate([
            {$match:{age:{$gte : 18}}}, // gte, lte, eq, sum,            
            {$project:{
                _id:0,
                name:1,
                age:1,
                address:1
            }},
            {$sort:{name:1}}, // -1 --> descending , +1 --> ascending
            {$limit:5},
            {$skip:0}// 0 * 2 = 0 , 1 * 2= 2 , 2 * 2 = 4, 3 * 2 = 6
        ]).then(result=>{
            console.log(result);
            res.send({Status:"Success",data:result});
        }).catch(err=>{
            console.log(err);
            res.send({Status:"Fail",data:err});
        })        
    }catch(err){
        console.log(err);
        res.send({Status:"Fail",data:err});
    }
}

const getstudentmarks = async(req,res)=>{
    try{
        const data =  req.body;        
        const st = await Student.aggregate([
            {
                $lookup:{
                    from:"marks", // target table location -- > mark
                    localField:"name", // local table -- student name -> common field
                    foreignField:"name", // target label -- mark name -> common field
                    as:"previousmark" // studentmark
                }
            },            
            {
                $lookup:{
                    from:"marks", // target table location -- > mark
                    localField:"name", // local table -- student name -> common field
                    foreignField:"name", // target label -- mark name -> common field
                    as:"studentmark" // studentmark
                }
            },            
            {
                $project:{
                    name:1,
                    age:1,
                    previousmark:1,
                    'studentmark.subject1' : 1,
                    'studentmark.subject2' : 1,
                    'studentmark.subject3' : 1,
                    'studentmark.subject4' : 1,
                    'studentmark.subject5' : 1
                }
            }
        ]).then(result=>{
            console.log(result);
            res.send({Status:"Success",data:result});
        }).catch(err=>{
            console.log(err);
            res.send({Status:"Fail",data:err});
        })        
    }catch(err){
        console.log(err);
        res.send({Status:"Fail",data:err});
    }
}

//step 3
module.exports = {
    getstudentuser,
    getstudentmarks
}