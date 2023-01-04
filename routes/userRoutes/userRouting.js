const router = require("express").Router();
const userModel = require("../../Models/userModel");
const jwt = require("jsonwebtoken");
const {
	hashPassword,
	matchPassword,
} = require("../../Helpers/HashPasswordHelper");
const token = require("../../Helpers/tokenHelper");
const authToken = require("../../middlewares/checkAuth");
const { uploadImage } = require("../../Helpers/imageUploader");

router.get("/getprofile/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const data = await userModel.findById(id);
		const Imagepath = data.profile.photo;
		res.status(200).sendFile(Imagepath);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.get("/getUsers", async (req, res) => {
	try {
		const data = await userModel.find();
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.post("/signup", uploadImage, async (req, res) => {
	const data = new userModel({
		fullname: req.body.fullname,
		username: req.body.username,
		email: req.body.email,
		profile: {
			name: req.file.originalname,
			photo: req.file.path,
		},
		password: await hashPassword(req.body.password),
	});
	try {
		const save = await data.save();
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.post("/login", async (req, res) => {
	const uname = req.body.username;
	const password = req.body.password;
	try {
		const user = await userModel.findOne({ username: uname });
		if (user == null) {
			res.status(200).json({ code: "404" });
		} else {
			// Hash the password
			// Check if the hashes are the same
			const check = await matchPassword(password, user.password);
			if (!check) {
				//password not correct
				res.status(200).json({ code: "403" });
			} else {
				const accessToken = await token(uname);
				res.status(200).json({ code: "200", accessToken: accessToken });
			}
		}
	} catch (error) {
		res
			.status(404)
			.json({ error: error.message, stack: error.stack, name: error.name });
		console.log(error);
	}
});

router.get("/validate", authToken, async (req, res) => {
	res.json({ code: "200", username: req.user });
});

module.exports = router;
