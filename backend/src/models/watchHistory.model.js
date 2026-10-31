const mongoose = require("mongoose");

const watchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    progressSeconds: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    durationSeconds: {
      type: Number,
      min: 1,
    },
    lastWatchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

watchHistorySchema.index({ user: 1, movie: 1 }, { unique: true });
watchHistorySchema.index({ user: 1, lastWatchedAt: -1 });

module.exports = mongoose.model("WatchHistory", watchHistorySchema);