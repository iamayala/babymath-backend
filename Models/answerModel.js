const { Schema, model } = require("mongoose");

const answerSchema = new Schema({
	picture: String,
	text: String,
});

const answerModel = model("answers", answerSchema);

module.exports = answerModel;
