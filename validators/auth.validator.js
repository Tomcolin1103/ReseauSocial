const yup = require("yup");

const authValidator = yup.object({
	email: yup.string().required(),
	password: yup.string().required(),
});

module.exports = authValidator;
