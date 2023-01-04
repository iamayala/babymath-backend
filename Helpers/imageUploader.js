const multer = require("multer");
const path = require("path");

const multerconfig = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(
			null,
			path.join(path.dirname(__filename), "../Images/profilepicture")
		);
	},
	filename: function (req, file, callback) {
		const ext = file.mimetype.split("/")[1];
		callback(null, `image-${Date.now()}.${ext}`);
	},
});

const multerconfigAnswers = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, path.join(path.dirname(__filename), "../Images/answers"));
	},
	filename: function (req, file, callback) {
		const ext = file.mimetype.split("/")[1];
		callback(null, `image-${Date.now()}.${ext}`);
	},
});

const multerconfigQuestions = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, path.join(path.dirname(__filename), "../Images/questions"));
	},
	filename: function (req, file, callback) {
		const ext = file.mimetype.split("/")[1];
		callback(null, `image-${Date.now()}.${ext}`);
	},
});

const isImage = (req, file, callback) => {
	if (file.mimetype.startsWith("image")) {
		callback(null, true);
	} else {
		callback(new Error("only images allowed"));
	}
};

const upload = multer({
	storage: multerconfig,
	fileFilter: isImage,
});

const Answers = multer({
	storage: multerconfigAnswers,
	fileFilter: isImage,
});

const questions = multer({
	storage: multerconfigQuestions,
	fileFilter: isImage,
});

const uploadImage = upload.single("photo");

const uploadAnswers = Answers.single("picture");

const uploadQuestion = questions.single("picture");

module.exports = { uploadImage, uploadAnswers, uploadQuestion };
