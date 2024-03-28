const router = require("express").Router();
const homeController = require("../controllers/home.controller");
const userController = require("../controllers/users.controller");

router.route("/").get(homeController.getHome);

module.exports = router;
