const usersController = require("./users.controller");

const render = {
	render: async (req, res) => {
		try {
			usersController.login();
			res.render("success");
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
};

module.exports = render;
