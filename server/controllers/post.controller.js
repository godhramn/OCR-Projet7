const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const CommentModel = require("../models/comment.model");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  if (req.file && req.file.mimetype.split("/")[0] === "image") {
    const post = new PostModel({
      author: req.body.author,
      content: req.body.content,
      imageURL: `${req.protocol}://${req.get("host")}/images/posts/${req.file.filename}`,
    })
    post.save()
    .then(() => res.status(200).json({ message: "post (with image) created"}))
    .catch(() => res.status(400).json({ error: "unable to create post (with image)"}))
  } else {
    const post = new PostModel({
      author: req.body.author,
      content: req.body.content,
    })
    post.save()
    .then(() => res.status(200).json({ message: "post created"}))
    .catch(() => res.status(400).json({ error: "unable to create post"}))
  }
};

exports.modifyPost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
  .then((post) => {
    if (req.file && req.file.mimetype.split("/")[0] === "image") {
      const filename = post.picture.split("images/posts/")[1];
      fs.unlink(`images/posts/${filename}`, () => {
        PostModel.updateOne(
          { _id: req.params.id },
          {
            ...req.body,
            imageURL: `${req.protocol}://${req.get("host")}/images/posts/${req.file.filename}`,
            _id: req.params.id,
          }
        )
        .then(() => res.status(200).json({ message: "post (with image) modified" }))
        .catch(() => res.status(400).json({ error: "unable to modify post (with image)" }));
      });
    } else {
      PostModel.updateOne(
        { _id: req.params.id},
        { 
          ...req.body,
          _id: req.params.id 
        },
      )
      .then(() => res.status(200).json({ message: "post modified" }))
          .catch(() => res.status(400).json({ error: "unable to modify post"}));
    }
  })
};

exports.deletePost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
  .then((post) => {
    CommentModel.deleteMany({ postId: req.params.id });
    const filename = post.imageURL.split("images/posts/")[1];
    fs.unlink(`images/posts/${filename}`, () => {
      PostModel.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "post deleted" }))
        .catch(() => res.status(400).json({ error: "unable to delete post" }));
    });
  })
  .catch(() => res.status(500).json( { error : "unable to access post to delete" }));
};

exports.getAllPosts = (req, res, next) => {
  PostModel.find()
    .then((posts) => res.status(200).json(posts))
    .catch(() => res.status(400).json({ error: "unable to retrieve posts" }));
};

exports.getOnePost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch(() => res.status(400).json({ error: "unable to find post" }));
};

exports.likePost = (req, res, next) => {
  let like = req.body.like;

  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      switch (like) {
        case 1:
          if (
            post.usersDisliked.includes(req.body.userId) &&
            !post.usersLiked.includes(req.body.userId)
          ) {
            PostModel.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $push: { usersLiked: req.body.userId },
                $inc: { dislikes: -1, likes: +1 },
              }
            )
              .then(() => res.status(200).json({ message: "Dislike enlevé" }))
              .catch((error) => res.status(400).json(error));
          } else if (!post.usersLiked.includes(req.body.userId)) {
            PostModel.updateOne(
              { _id: req.params.id },
              { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } }
            )
              .then(() => res.status(200).json({ message: "Like ajouté" }))
              .catch((error) => res.status(400).json(error));
          }

          break;

        case -1:
          if (
            post.usersLiked.includes(req.body.userId) &&
            !post.usersDisliked.includes(req.body.userId)
          ) {
            Post.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersLiked: req.body.userId },
                $push: { usersDisliked: req.body.userId },
                $inc: { likes: -1, dislikes: +1 },
              }
            )
              .then(() => res.status(200).json({ message: "Like enlevé" }))
              .catch((error) => res.status(400).json(error));
          } else if (!post.usersDisliked.includes(req.body.userId)) {
            PostModel.updateOne(
              { _id: req.params.id },
              {
                $push: { usersDisliked: req.body.userId },
                $inc: { dislikes: +1 },
              }
            )
              .then(() => res.status(200).json({ message: "Dislike ajouté" }))
              .catch((error) => res.status(400).json(error));
          }
          break;

        case 0:
          if (post.usersDisliked.includes(req.body.userId)) {
            PostModel.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $inc: { dislikes: -1 },
              }
            )
              .then(() => res.status(200).json({ message: "Dislike enlevé" }))
              .catch((error) => res.status(400).json(error));
          }
          if (post.usersLiked.includes(req.body.userId)) {
            PostModel.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersLiked: req.body.userId },
                $inc: { likes: -1 },
              }
            )
              .then(() => res.status(200).json({ message: "Like enlevé" }))
              .catch((error) => res.status(400).json(error));
          }
          break;
      }
    })
    .catch((error) => res.status(500).json(error));
};