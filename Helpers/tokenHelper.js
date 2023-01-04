const jwt = require("jsonwebtoken");

const generateToken = async (username) => {
	const accessToken = jwt.sign({ username }, "THIS IS A SECRET", {
		expiresIn: "2m",
	});
	return accessToken;
};

module.exports = generateToken;
