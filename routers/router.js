const router = require("express").Router();
const usersRouter = require("./users.router");
const homeRouter = require("./home.router");
const postsRouter = require("./posts.router");

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/", homeRouter);

module.exports = router;
