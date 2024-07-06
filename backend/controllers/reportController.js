const Report = require("../models/report");

const createReport = async (req, res) => {
  try {
    const { quiz, result, correctAnswers, totalQuestions, wrongAnswers } =
      req.body;
    const user = req.user._id;
    const report = await Report.create({
      quiz,
      user,
      result,
      correctAnswers,
      totalQuestions,
      wrongAnswers,
    });

    if (report) {
      return res.status(201).json({
        message: "Report created successfully",
        data: report,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Invalid report data",
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

const getAllReports = async (req, res) => {
  try {
    const user = req.user._id;
    const reports = await Report.find({ user });
    return res.status(200).json({
      message: "Reports fetched successfully",
      data: reports,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred",
      error: true,
    });
  }
};

const getReports = async (req, res) => {
  try {
    const { quizId } = req.params;
    const reports = await Report.find({ quiz: quizId });
    return res.status(200).json({
      message: "Reports fetched successfully",
      data: reports,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred",
      error: true,
    });
  }
};

module.exports = { createReport, getAllReports, getReports };
