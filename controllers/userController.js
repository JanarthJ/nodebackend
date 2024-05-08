//step 1
const mongoose = require("mongoose");
const Student = require("../modal/student");

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

//step 3
module.exports = {
    getstudentuser
}