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
//step 3
module.exports = router;