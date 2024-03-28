const postsService = require("../services/posts.service");

const postsController = {
	getAll: async (req, res) => {
		const result = await postsService.getAll();
		if (result) {
			res.render("posts.pug", { result: result.recordset });
		}
	},
	getById: async (req, res) => {
		const postId = req.params.id;
		const result = await postsService.getById(postId);
		if (result) {
			res.render("post", {
				post: result[0],
				comments: result[1],
				postId: postId,
			});
		}
	},
	comment: async (req, res) => {
		const postId = req.params.id;
		const { content, userId } = req.body;
		const result = await postsService.comment({
			postId: postId,
			content: content,
			userId: userId,
		});
		if (result) {
			res.redirect(`/posts/${postId}`);
		}
	},
};

module.exports = postsController;
