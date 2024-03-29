const jwt = require("jsonwebtoken");
const usersService = require("../services/users.service");

const jwtVerification = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const userSession = req.session
	let token;
	if (authHeader) {
		token = authHeader && authHeader.split(" ")[1];
	} else if (userSession) {
		token = userSession.user.token
	}
	const secretKey = process.env.JWT_SECRET;

	if (!token) {
		res.sendStatus(403);
	} else {
		jwt.verify(token, secretKey, (err, payload) => {
			if (err && err.name !== "TokenExpiredError") {
				res.sendStatus(403);
			} else if (err && err.name === "TokenExpiredError") {
				// Ne comptes pas trop sur l'auto-refresh token
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
