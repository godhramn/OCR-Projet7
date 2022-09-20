const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    postId: { type: String },
    author: { type: String, required: true },
    content: { type: String, required: true },
    imageURL: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);