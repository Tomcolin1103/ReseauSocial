const jwt = require("jsonwebtoken");
const usersService = require("../services/users.service");

const jwtVerification = async (req, res, next) => {
	console.log(req.headers);
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	const secretKey = process.env.JWT_SECRET;

	if (!token) {
		res.sendStatus(403);
	} else {
		jwt.verify(token, secretKey, (err, payload) => {
			if (err && err.name !== "TokenExpiredError") {
				res.sendStatus(403);
			} else if (err && err.name === "TokenExpiredError") {
				const decodedTokenPayload = jwt.decode(token);
				const newPayload = {
					userId: decodedTokenPayload.userId,
					email: decodedTokenPayload.email,
				};

				const newToken = jwt.sign(newPayload, secretKey, { expiresIn: "2d" });
				req.payload = newPayload;
				req.headers.authorization = `Bearer ${newToken}`;
				next();
			} else {
				req.payload = payload;
				next();
			}
		});
	}
};

module.exports = jwtVerification;
