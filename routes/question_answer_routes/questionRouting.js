const router = require("express").Router();
const authToken = require("../../middlewares/checkAuth");
const questionModel = require("../../Models/questionModel");
const { uploadQuestion } = require("../../Helpers/imageUploader");

router.get("/getquestionpic/:id", authToken, async (req, res) => {
	const id = req.params.id;
	try {
		const data = await questionModel.findById(id);
		const Imagepath = data.picture;
		res.status(200).sendFile(Imagepath);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.get("/getquestions", authToken, async (req, res) => {
	try {
		const data = await questionModel.find();
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.post("/addquestion", authToken, uploadQuestion, async (req, res) => {
	const data = new questionModel(req.body);
	data.picture = req.file.path;
	try {
		const savedData = await data.save();
		res.status(200).json(savedData);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.post("/updatequestion", authToken, async (req, res) => {
	const id = req.body.id;
	try {
		const data = await questionModel.findByIdAndUpdate(id, req.body);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.delete("/deletequestion/:id", authToken, async (req, res) => {
	const id = req.body.id;
	try {
		const data = await questionModel.findOneAndDelete(id);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.get("/findonequestion/:id", authToken, async (req, res) => {
	const id = req.params.id;
	try {
		const data = await questionModel.findById(id);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
