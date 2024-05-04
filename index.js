//ES5 --version
//step 1
var express = require("express"); //import 
var mongoose = require("mongoose");
var studentRoute = require("./routes/studentRoutes"); //phase 6
//step 2
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// step 4 api creation
//HTTPS
app.get('/',(request,response)=>{
    response.send({data:"Hello",url:"image.png"});  
});

var uri = "mongodb+srv://praveen17mails:Praveen17@cluster0.3upltpv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var connectionParams = {useNewUrlParser:true,useUnifiedTopology:true};
//step 5 DB Connection
mongoose.connect(uri,connectionParams)
.then(()=>{console.log("DB connected Successfully")})
.catch((err)=>{console.log("Error connecting to mongoDB",err)});


//step 6 mention api path here
app.use("/student",studentRoute);  //phase 6
// http://localhost:5000/student/register



//http://localhost:5000/
//step 3
app.listen(5000,()=>{
    console.log("server running on port http://localhost:5000"); 
});



// Model.find() -- findall 
// Model.findById()
// Model.findByIdAndDelete() -- version 4 introduced
// Model.findByIdAndRemove() -- version 4  and after version 4 deprecated
// Model.findByIdAndUpdate()
// Model.findOne()
// Model.findOneAndDelete()
// Model.findOneAndReplace() 
// Model.findOneAndUpdate()
// Model.replaceOne()
// Model.updateMany()
// Model.updateOne()
// Model.deleteMany()
// Model.deleteOne() // 