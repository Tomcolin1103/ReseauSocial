const bcrypt = require("bcrypt");
const usersService = require("../services/users.service");
const registerValidator = require("../validators/register.validator");
const authValidator = require("../validators/auth.validator");
const jwt = require("jsonwebtoken");

const userController = {
	getLogin: (req, res) => {
		res.render("login");
	},
	getRegister: (req, res) => {
		res.render("register");
	},
	register: async (req, res) => {
		try {
			const validationResult = await registerValidator.validate(req.body);
			if (validationResult.error) {
				res.status(400).json({ error: validationResult.error });
				return;
			}
			const { email, password, pseudo } = validationResult;
			const hashedPassword = bcrypt.hashSync(password, 10);

			const registrationResult = await usersService.register({
				email,
				hashedPassword,
				pseudo,
			});
			if (registrationResult.rowsAffected[0] > 0) {
				res.render("success");
			} else {
				res.status(500).json({ message: "Something went wrong" });
			}
		} catch (err) {
			console.error(err);
			res.sendStatus(500);
		}
	},
	login: async (req, res) => {
		try {
			const validationResult = await authValidator.validate(req.body);
			if (validationResult.error) {
				return res.status(400).json({ error: validationResult.error });
			}

			const { email, password } = validationResult;
			const user = await usersService.login(email, password);

			if (!user) {
				return res.status(401).json({ message: "Invalid Password" });
			} else {
				if (user.JWT !== null) {
					res.setHeader("authorization", `Bearer ${user.JWT}`);
					return;
				}
				const payload = {
					userId: user.id,
					email: user.email,
				};
				const options = {
					expiresIn: "5s",
				};
				const secret = process.env.JWT_SECRET;
				const token = jwt.sign(payload, secret, options);
				const addToken = usersService.updateJwt(user.id, token);
				return res
					.setHeader("Authorization", `Bearer ${token}`)
					.render("success");
				console.log(req.header);
			}
		} catch (err) {
			console.error(err);
		}
	},
	getAll: async (req, res) => {
		try {
			const result = await usersService.getAll();
			if (result) {
				res.status(200).json(result);
			}
		} catch (err) {
			console.error(err);
			res.sendStatus(500);
		}
	},
};

module.exports = userController;
