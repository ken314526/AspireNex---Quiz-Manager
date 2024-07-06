const Question = require("../models/question");

const addQuestion = async (req, res) => {
  try {
    const { quiz, questionText, options, correctAnswer } = req.body;
    const question = await Question.create({
      quiz,
      questionText,
      options,
      correctAnswer,
    });

    if (question) {
      return res.status(201).json({
        message: "Question added successfully",
        data: question,
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Invalid question data",
        error: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred",
      error: true,
    });
  }
};

const getQuestions = async (req, res) => {
  try {
    const { quizId } = req.params;
    const questions = await Question.find({ quiz: quizId });
    return res.status(200).json({
      message: "Questions fetched successfully",
      data: questions,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred",
      error: true,
    });
  }
};

const removeQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const question = await Question.findByIdAndDelete(questionId);

    if (question) {
      return res.status(200).json({
        message: "Question deleted successfully",
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Question not found",
        error: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred",
      error: true,
    });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { questionText, options, correctAnswer } = req.body;

    const question = await Question.findById(questionId);

    if (question) {
      question.questionText = questionText;
      question.options = options;
      question.correctAnswer = correctAnswer;

      const updatedQuestion = await question.save();
      return res.status(200).json({
        message: "Question updated successfully",
        data: updatedQuestion,
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Question not found",
        error: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred",
      error: true,
    });
  }
};

module.exports = { addQuestion, getQuestions, removeQuestion, updateQuestion };
