const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
	text: String,
	picture: String,
	pictureDescription: String,
	hint: String,
	difficult: Number,
	unit: {
		type: Schema.Types.ObjectId,
		ref: "unit",
	},
	optionAnswers: [
		{
			type: Schema.Types.ObjectId,
			ref: "answers",
		},
	],
	correctAnswer: {
		type: Schema.Types.ObjectId,
		ref: "answers",
	},
});

const questionModel = model("questions", questionSchema);

module.exports = questionModel;
