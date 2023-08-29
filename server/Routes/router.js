const express = require("express");
const router = new express.Router();
const controllers = require("../controller/userController")
//routers
router.post("/user/register",controllers.userpost);
router.get("/user/getuser",controllers.getuser);
router.get("/user/singleuser/:id",controllers.getsingleuser);
router.delete("/user/deleteuser/:id",controllers.deleteuser);
router.put("/user/updateuser/:id", controllers. dateUpdated);


module.exports = router;