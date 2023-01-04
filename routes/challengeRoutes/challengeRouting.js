const router = require("express").Router();
const authToken = require("../../middlewares/checkAuth");
const challengeModel = require("../../Models/challengeModel");

router.get("/getchallenges", authToken, async (req, res) => {
	try {
		const data = await challengeModel.find();
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.post("/addchallenge", authToken, async (req, res) => {
	const data = new challengeModel(req.body);
	try {
		const savedData = await data.save();
		res.status(200).json(savedData);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.post("/updatechallenge", authToken, async (req, res) => {
	const id = req.body.id;
	try {
		const data = await challengeModel.findByIdAndUpdate(id, req.body);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.delete("/deletechallenge/:id", authToken, async (req, res) => {
	const id = req.body.id;
	try {
		const data = await challengeModel.findOneAndDelete(id);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.get("/findonechallenge/:id", authToken, async (req, res) => {
	const id = req.params.id;
	try {
		const data = await challengeModel.findById(id);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
