//step 1
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

//step 2
router.post("/register",studentController.createStudent);
router.get("/getStudent",studentController.getStudent);
router.post("/getStudentbyid",studentController.getStudentById);
router.put("/updateStudentbyid",studentController.updateStudentByID);
router.post("/deleteStudentbyid",studentController.deleteStudentByID);
// //using db property 
router.post("/getStudentbyname",studentController.getStudentByproperty);
router.put("/getandupdateStudentbyname",studentController.getStudentBypropertyAndUpdate);
router.put("/getandreplace",studentController.getStudentBypropertyAndReplace);
router.put("/getanddelete",studentController.getStudentBypropertyAndDelete);
// many data
router.put("/updatemany",studentController.updatemanystudents);
router.put("/deletemany",studentController.deletemanystudents);
//step 3
module.exports = router;