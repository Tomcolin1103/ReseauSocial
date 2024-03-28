const postsRouter = require("express").Router();
const postsController = require("../controllers/posts.controller");

postsRouter.route("/").get(postsController.getAll);

module.exports = postsRouter;
