const yup = require("yup");

const commentValidator = yup.object({
	content: yup.string().required(),
});

module.exports = commentValidator;
