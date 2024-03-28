const postsService = require("../services/posts.service");

const postsController = {
	getAll: async (req, res) => {
		const result = await postsService.getAll();
		if (result) {
			res.render("posts.pug", { result: result.recordset });
		}
	},
};

module.exports = postsController;
