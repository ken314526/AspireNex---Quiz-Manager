const Quiz = require("../models/quiz");
const Question = require("../models/question");

const createQuiz = async (req, res) => {
  try {
    const { title } = req.body;
    const quiz = await Quiz.create({
      title,
      code: Math.random().toString(36).substr(2, 8),
      user: req.user._id,
    });

    if (quiz) {
      return res.status(201).json({
        message: "Quiz created successfully",
        data: quiz,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Invalid quiz data",
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

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user._id });
    return res.status(200).json({
      message: "Quizzes fetched successfully",
      data: quizzes,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred",
      error: true,
    });
  }
};

const getQuizByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const quiz = await Quiz.findOne({ code }).populate("questions");

    if (quiz) {
      return res.status(200).json({
        message: "Quiz fetched successfully",
        data: quiz,
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Quiz not found",
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

const addQuestionToQuiz = async (req, res) => {
  try {
    const { quizId, questionText, options, correctAnswer } = req.body;
    const quiz = await Quiz.findById(quizId);

    if (quiz) {
      const question = await Question.create({
        quiz: quiz._id,
        questionText,
        options,
        correctAnswer,
      });

      quiz.questions.push(question._id);
      await quiz.save();

      return res.status(201).json({
        message: "Question added successfully",
        data: question,
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Quiz not found",
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

const deleteQuizz = async (req, res) => {
  const quizId = req.params.id;

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deletedQuiz) {
      return res.status(404).json({
        message: "Quiz not found",
        error: true,
      });
    }

    await Report.deleteMany({ quiz: quizId });

    return res.status(200).json({
      message: "Quiz and associated reports deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred",
      error: true,
    });
  }
};

module.exports = {
  createQuiz,
  getQuizzes,
  getQuizByCode,
  addQuestionToQuiz,
  deleteQuizz,
};
