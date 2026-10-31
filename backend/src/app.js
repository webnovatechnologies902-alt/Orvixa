const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.route.js");
const movieRoutes = require("./routes/movie.route.js");
const userRoutes = require("./routes/user.route.js");
const watchHistoryRoutes = require("./routes/watchHistory.route.js");
const watchlistRoutes = require("./routes/watchlist.route.js");
const movieLikeRoutes = require("./routes/movieLike.route.js");
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
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/watch-history", watchHistoryRoutes);
app.use("/api/v1/watchlist", watchlistRoutes);
app.use("/api/v1/likes", movieLikeRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;