const CommentModel = require("../models/comment.model");

exports.createComment = (req, res, next) => {
    const comment = new CommentModel({
      author: req.body.author,
      content: req.body.content,
      postId: req.body.postId,
    })
    comment.save()
    .then(() => res.status(200).json({ message: "comment created"}))
    .catch(() => res.status(400).json({ error: "unable to create comment"}))
};

exports.modifyComment = (req, res, next) => {
  CommentModel.updateOne({ _id: req.params.id }, { content: req.body.content })
  .then(() => res.status(201).json({ message: "comment modified" }))
  .catch(() => res.status(400).json({ error: "unable to modify comment" }));
};

exports.deleteComment = (req, res, next) => {  
  CommentModel.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: "comment deleted" }))
  .catch(() => res.status(400).json({ error: "unable to delete comment" }));
};

exports.getAllComments = (req, res, next) => {
  CommentModel.find()
  .then((comments) => res.status(200).json(comments))
  .catch(() => res.status(400).json({ error: "unable to retrieve comments" }));
};

exports.getOneComment = (req, res, next) => {
  CommentModel.findOne({ _id: req.params.id })
  .then((comment) => res.status(200).json(comment))
  .catch(() => res.status(400).json({ error: "unable to find comment" }));
};