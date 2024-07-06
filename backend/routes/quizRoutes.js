const express = require("express");
const {
  createQuiz,
  getQuizzes,
  getQuizByCode,
  addQuestionToQuiz,
  deleteQuizz,
} = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createQuiz);
router.get("/", protect, getQuizzes);
router.get("/code/:code", getQuizByCode);
router.post("/add-question", protect, addQuestionToQuiz);
router.delete("/:id", deleteQuizz);

module.exports = router;
