const postsRouter = require("express").Router();
const postsController = require("../controllers/posts.controller");

postsRouter.route("/").get(postsController.getAll);
postsRouter
	.route("/:id")
	.get(postsController.getById)
	.post(postsController.comment);

module.exports = postsRouter;
