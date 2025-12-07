const express = require("express");
// const userController = require("../controllers/user.controller");
const{authenticate,authorize} = require("../middleware/user.middleware");
const userHandler = require("../controllers/user.controller");
const otpController = require("../controllers/otp.controller")

const userRouter = express.Router();

userRouter.post("/login" , userHandler.login);
userRouter.post("/create", userHandler.CreateUser);
userRouter.put("/update/:id", authenticate  , userHandler.updated);
userRouter.delete("/delete/:id", authenticate ,authorize, userHandler.deleteUser);
userRouter.get("/", userHandler.getAll);
userRouter.get("/:id", userHandler.getById);
userRouter.post("/send-otp", otpController.sendOtp);
userRouter.post("/verify-otp", otpController.verifyOtp);
module.exports = userRouter;