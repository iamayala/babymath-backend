const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

const matchPassword = async (userPassword, Password) => {
	let match = await bcrypt.compare(userPassword, Password);
	return match;
};

module.exports = { hashPassword, matchPassword };
