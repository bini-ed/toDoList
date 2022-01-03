const express = require("express");
const listController = require("../controller/listController");
const authUser = require("../middleware/authMiddleware");

const router = express.Router();

router.delete("/deleteList/:list_id", authUser, listController.deleteList); //protect the route in which user can't delete list unless ther are authenticated
router.get("/getList/:user_id", listController.getList);
router.get("/getCompletedList/:user_id", listController.getCompletedList);
router.post("/addList", authUser, listController.addList); //protect the route in which user can't add to-do list unless ther are authenticated
router.put("/editList", listController.editList); //protect the route in which user can't edit to-do list unless ther are authenticated

module.exports = router;
