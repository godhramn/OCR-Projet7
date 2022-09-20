const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
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
      Comment.deleteMany({ postId: req.params.id });
      const filename = post.picture.split("images/posts/")[1];
      fs.unlink(`images/posts/${filename}`, () => {
        PostModel.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "post deleted" }))
          .catch(() => res.status(400).json({ error: "unable to delete post" }));
      });
    })
    .catch(() => res.status(500).json( { error : "unable to find post to delete" }));
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
  PostModel.findOne({ _id: req.params.id })
  .then((post) => {
    /* Si l'utilisateur like le post */
    if (req.body.like == 1 && !post.usersLiked.includes(req.auth.userId)) {
      PostModel.updateOne(
        { _id: req.params.id },
        { $push: { usersLiked: req.auth.userId }, $inc: { likes: +1 } }
      )
      .then(() => {
        res.status(200).json({ message: "liked" });
      })
      .catch((error) => res.status(400).json({ error }));
    } 
    /* Si l'utilisateur dislike le post */ 
    else if (req.body.like == -1 && !post.usersDisliked.includes(req.auth.userId)) {
      PostModel.updateOne(
        { _id: req.params.id },
        { $push: { usersDisliked: req.auth.userId }, $inc: { dislikes: +1 }}
      )
      .then(() => {
        res.status(200).json({ message: "disliked" });
      })
      .catch((error) => res.status(400).json({ error }));
    } 
    /* Si l'utilisateur retire son like/dislike */
    else {
      if (post.usersLiked.includes(req.auth.userId)) {
        PostModel.updateOne(
          { _id: req.params.id },
          { $pull: { usersLiked: req.auth.userId }, $inc: { likes: -1 } }
        )
        .then(() => {
          res.status(200).json({ message: "like canceled" });
        })
        .catch((error) => res.status(400).json({ error }));
      } else if (post.usersDisliked.includes(req.auth.userId)) {
        PostModel.updateOne(
          { _id: req.params.id },
          { $pull: { usersDisliked: req.auth.userId }, $inc: { dislikes: -1 }}
        )
        .then(() => {
          res.status(200).json({ message: "dislike canceled" });
        })
        .catch((error) => res.status(400).json({ error }));
      }
    }
  });
};
