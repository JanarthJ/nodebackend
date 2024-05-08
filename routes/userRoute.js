//step 1
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/getstudentuser",userController.getstudentuser);
//step 3
module.exports = router;