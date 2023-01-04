const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
	const token = req.header("x-auth-token");

	if (!token) {
		res.status(200).json({ code: "304", message: "no token" });
	}

	try {
		const user = await jwt.verify(token, "THIS IS A SECRET");
		req.user = user.username;
		next();
	} catch (error) {
		res.status(200).json({ code: "301", message: "session timed out" });
	}
};

module.exports = checkAuth;
