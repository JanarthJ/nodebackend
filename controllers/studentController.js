//step 1
const mongoose = require("mongoose");
const Student = require("../modal/student");
const Mark = require("../modal/mark");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashMyPassword = async(mypassword)=>{
    // tech 1
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //     bcrypt.hash(mypassword, salt, function(err, hash) {
    //         // Store hash in your password DB.
    //         console.log(hash);
    //         // return hash;
    //     });
    // });

    // // tech 2
    // bcrypt.hash(mypassword, saltRounds, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    //     return hash;
    // });

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(mypassword, salt);
    return hash;

    // let hash = "$2b$10$eaWR.fDRUQ6YVYnk0taxKOFf8JBbD0Mfck2YAobUaS9pRVW9oCP5i";
    let myPlaintextPassword = "abcd@123";
    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        // result == true
        console.log(result);
    });


}
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
        .catch((error)=>{
            console.error(error);
            res.send({status:"Fail",data:error});
        })
    }catch(error){
        console.error(error);
    }
}


//step 2
const createStudent = async(req,res)=>{
    try{
        const data = req.body;
        console.log(data);
        // validation 
        // let hashpass = await hashMyPassword(data.password);
        // console.log(hashpass);
        // res.send({status:"Success",data:hashpass});
        //step 4
        // const st = await Student.create(data)
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(data.password, salt);        

        const st = await Student.create({
            name:data.name,
            age:data.age,
            address:data.address,
            password:hash,
            nationality:"Indian"
        }).then((result)=>{
            console.log(result);
            res.send({status:"Success",data:result});
        })
        .catch((error)=>{
            console.error(error);
            res.send({status:"Fail",data:error});
        })
    }catch(error){
        console.error(error);
    }
}

const LoginStudent = async(req,res)=>{
    try{
        const data =  req.body;
        const st = await Student.findOne({name:data.name});
        console.log(st);
        console.log(st.password);
        let isAuth = bcrypt.compareSync(data.password, st.password);
        console.log(isAuth);
        if(isAuth){
            st['password'] = "";            
            res.send({Status:"Auth Success",data:st});
        }else{
            res.send({Status:"Invalid credential",data:{}});
        }
        
    }catch(error){
        console.log(error);
        res.send({Status:"Fail",data:error});
    }
}


const getStudent = async(req,res)=>{
    try{
        const st = await Student.find();
        res.send({Status:"Success",data:st});
    }catch(error){
        console.log(error);
        res.send({Status:"Fail",data:error});
    }
}

const getStudentById = async(req,res)=>{
    try{
        const data =  req.body;
        const st = await Student.findById(data._id);        
        res.send({Status:"Success",data:st});
    }catch(error){
        console.log(error);
        res.send({Status:"Fail",data:error});
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
        .catch((error)=>{
            console.error(error);
            res.send({status:"Fail",data:error});
        })
    }catch(error){
        console.error(error);
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
        .catch((error)=>{
            console.error(error);
            res.send({status:"Fail",data:error});
        })
    }catch(error){
        console.error(error);
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
    }catch(error){
        console.log(error);
        res.send({Status:"Fail",data:error});
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
    }catch(error){
        console.log(error);
        res.send({Status:"Fail",data:error});
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
    }catch(error){
        console.log(error);
        res.send({Status:"Fail",data:error});
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
    }catch(error){
        console.log(error);
        res.send({Status:"Fail",data:error});
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
    }catch(error){
        console.log(error);
        res.send({Status:"Fail",data:error});
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
    }catch(error){
        console.log(error);
        res.send({Status:"Fail",data:error});
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
    LoginStudent,
    createMark,
};

