const userRouter = require("express").Router();
const userController = require("../controllers/users.controller");
const jwtVerification = require("../middlewares/jwtVerification");

userRouter
	.route("/login")
	.get(userController.getLogin)
	.post(userController.login, jwtVerification);

userRouter
	.route("/register")
	.get(userController.getRegister)
	.post(userController.register);

module.exports = userRouter;
