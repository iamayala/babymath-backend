const router = require("express").Router();
const authToken = require("../../middlewares/checkAuth");
const unitModel = require("../../Models/unitModel");

router.get("/getunits", async (req, res) => {
	try {
		const data = await unitModel.find();
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.post("/addunit", async (req, res) => {
	const data = new unitModel({
		level: req.body.level,
		name: req.body.name,
	});
	try {
		const savedData = await data.save();
		res.status(200).json(savedData);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.post("/updateunits", authToken, async (req, res) => {
	const id = req.body.id;
	try {
		const data = await unitModel.findByIdAndUpdate(id, req.body);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.delete("/deleteunit/:id", authToken, async (req, res) => {
	const id = req.body.id;
	try {
		const data = await unitModel.findOneAndDelete(id);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.get("/findoneunit/:id", authToken, async (req, res) => {
	const id = req.params.id;
	try {
		const data = await unitModel.findById(id);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
