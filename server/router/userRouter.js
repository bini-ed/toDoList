const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.get("/getUser", userController.getUser);
router.post("/createUser", userController.createUser);
router.post("/userAuthenticate", userController.userAuthenticate);

module.exports = router;
