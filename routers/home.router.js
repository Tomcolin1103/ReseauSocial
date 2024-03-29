const router = require("express").Router();
const homeController = require("../controllers/home.controller");
const userController = require("../controllers/users.controller");
const isAuth = require('../middlewares/isAuth')

router.route("/").get(isAuth, homeController.getHome);

module.exports = router;
