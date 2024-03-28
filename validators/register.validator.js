const yup = require("yup");

const registerValidator = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required(),
	pseudo: yup.string().required(),
});

module.exports = registerValidator;
