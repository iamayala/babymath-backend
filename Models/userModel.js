const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		fullname: String,
		username: String,
		email: String,
		password: String,
		profile: {
			name: String,
			photo: String,
		},
		study: {
			dailyGoal: Number,
			daysChallenged: Number,
			lastDayChallenged: Date,
			lastDateXP: Number,
			streakDays: Number,
			streakLastDate: Date,
			xp: Number,
			completedChallenges: [String],
		},
	},
	{ timestamps: true }
);

const userModel = model("users", userSchema);
module.exports = userModel;
