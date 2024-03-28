const userRouter = require("express").Router();
const userController = require("../controllers/users.controller");
const jwtVerification = require("../middlewares/jwtVerification");

userRouter
	.route("/login")
	.get(userController.getLogin)
	.post(jwtVerification, userController.login);

userRouter
	.route("/register")
	.get(userController.getRegister)
	.post(userController.register);

module.exports = userRouter;
