const express = require("express");
const {
  addQuestion,
  getQuestions,
  removeQuestion,
  updateQuestion,
} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addQuestion);
router.get("/:quizId", protect, getQuestions);
router.delete("/:questionId", protect, removeQuestion);
router.put("/:questionId", protect, updateQuestion);

module.exports = router;
