const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    postId: { type: String },
    author: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);