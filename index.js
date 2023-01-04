const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouters = require("./routes/userRoutes/userRouting");
const unitRoutes = require("./routes/question_answer_routes/unitRouting");
const questionsRoutes = require("./routes/question_answer_routes/questionRouting");
const answerRoutes = require("./routes/question_answer_routes/answerRouting");
const challengeRouting = require("./routes/challengeRoutes/challengeRouting");

// mongoose connection
mongoose.connect("mongodb://localhost:27017/babymath", {
	useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
	console.log(error);
});

app = express();
// enabling cors middleware
app.use(cors({ origin: "*" }));

// parsing body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// our middlewares
app.use("/api/users", userRouters);
app.use("/api/units", unitRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/challenges", challengeRouting);

app.listen(5555, () => {
	console.log("SERVER STARTED AND RUNNING");
});
