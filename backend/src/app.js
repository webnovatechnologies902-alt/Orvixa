const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.route.js");
const notFoundMiddleware = require("./middleware/notFound.middleware.js");
const errorMiddleware = require("./middleware/error.middleware.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Orvixa API is running",
  });
});

app.use("/api/v1/auth", authRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;