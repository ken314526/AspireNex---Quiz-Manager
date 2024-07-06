const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes");
const reportRoutes = require("./routes/reportRoutes");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(express.json());
app.use(morgan(":method :url :status"));

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/report", reportRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend Connected: http://localhost:${PORT}`)
);
