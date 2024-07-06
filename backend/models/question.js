const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Quiz",
    },
    questionText: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
