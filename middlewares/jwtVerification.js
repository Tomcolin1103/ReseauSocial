const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.JWT_SECRET;
const authJwt = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	console.log(req.headers);

	if (authHeader) {
		const token = authHeader.split(" ")[1];

		jwt.verify(token, accessTokenSecret, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}

			req.user = user;
			next();
		});
	} else {
		res.sendStatus(401);
		next();
	}
};

module.exports = authJwt;
