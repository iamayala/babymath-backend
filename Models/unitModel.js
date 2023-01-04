const { Schema, model } = require("mongoose");

const unitSchema = new Schema({
	level: Number,
	name: String,
});

const unitModel = model("unit", unitSchema);
module.exports = unitModel;
