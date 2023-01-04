const router = require("express").Router();
const authToken = require("../../middlewares/checkAuth");
const answerModel = require("../../Models/answerModel");
const { uploadAnswers } = require("../../Helpers/imageUploader");

router.get("/getanswerpic/:id", authToken, async (req, res) => {
	const id = req.params.id;
	try {
		const data = await answerModel.findById(id);
		const Imagepath = data.picture;
		res.status(200).sendFile(Imagepath);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.get("/getanswers", authToken, async (req, res) => {
	try {
		const data = await answerModel.find();
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.post("/addanswer", authToken, uploadAnswers, async (req, res) => {
	const data = new answerModel({
		picture: req.file.path,
		text: req.body.text,
	});
	try {
		const savedData = await data.save();
		res.status(200).json(savedData);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.post("/updateanswer", authToken, async (req, res) => {
	const id = req.body.id;
	try {
		const data = await answerModel.findByIdAndUpdate(id, req.body);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.delete("/deleteanswer/:id", authToken, async (req, res) => {
	const id = req.body.id;
	try {
		const data = await answerModel.findOneAndDelete(id);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.get("/findoneanswer/:id", authToken, async (req, res) => {
	const id = req.params.id;
	try {
		const data = await answerModel.findById(id);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
