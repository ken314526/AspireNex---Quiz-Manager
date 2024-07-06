const express = require("express");
const {
  createReport,
  getReports,
  getAllReports,
} = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createReport);
router.get("/", protect, getAllReports);
router.get("/:quizId", protect, getReports);

module.exports = router;
