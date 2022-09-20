const CommentModel = require("../models/comment.model");

exports.createComment = (req, res, next) => {
  if (req.file && req.file.mimetype.split("/")[0] === "image") {
    const comment = new CommentModel({
      author: req.body.author,
      content: req.body.content,
      imageURL: `${req.protocol}://${req.get("host")}/images/comments/${req.file.filename}`,
    })
    comment.save()
    .then(() => res.status(200).json({ message: "comment (with image) created"}))
    .catch(() => res.status(400).json({ error: "unable to create comment (with image)"}))
  } else {
    const comment = new CommentModel({
      author: req.body.author,
      content: req.body.content,
    })
    comment.save()
    .then(() => res.status(200).json({ message: "comment created"}))
    .catch(() => res.status(400).json({ error: "unable to create comment"}))
  }
};

exports.modifyComment = (req, res, next) => {
  CommentModel.findOne({ _id: req.params.id })
  .then((comment) => {
    if (req.file && req.file.mimetype.split("/")[0] === "image") {
      const filename = comment.picture.split("images/comments/")[1];
      fs.unlink(`images/comments/${filename}`, () => {
        CommentModel.updateOne(
          { _id: req.params.id },
          {
            ...req.body,
            imageURL: `${req.protocol}://${req.get("host")}/images/comments/${req.file.filename}`,
            _id: req.params.id,
          }
        )
        .then(() => res.status(200).json({ message: "comment (with image) modified" }))
        .catch(() => res.status(400).json({ error: "unable to modify comment (with image)" }));
      });
    } else {
      CommentModel.updateOne(
        { _id: req.params.id},
        { 
          ...req.body,
          _id: req.params.id 
        },
      )
      .then(() => res.status(200).json({ message: "comment modified" }))
          .catch(() => res.status(400).json({ error: "unable to modify comment"}));
    }
  })
};

exports.deleteComment = (req, res, next) => {
  CommentModel.findOne({ _id: req.params.id })
    .then((comment) => {
      Comment.deleteMany({ commentId: req.params.id });
      const filename = comment.picture.split("images/comments/")[1];
      fs.unlink(`images/comments/${filename}`, () => {
        CommentModel.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "comment deleted" }))
          .catch(() => res.status(400).json({ error: "unable to delete comment" }));
      });
    })
    .catch(() => res.status(500).json( { error : "unable to find comment to delete" }));
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