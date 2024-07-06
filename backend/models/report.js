const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Quiz",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    result: {
      type: String,
      required: true,
    },
    correctAnswers: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    wrongAnswers: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
