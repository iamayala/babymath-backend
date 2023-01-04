const { Schema, model } = require("mongoose");

const challengeSchema = new Schema({
	title: String,
	level: Number,
	difficulty: Number,
	cover: String,
	disabled: Boolean,
	question: [
		{
			type: Schema.Types.ObjectId,
			ref: "questions",
		},
	],
});

const challengeModel = model("challenges", challengeSchema);

module.exports = challengeModel;
