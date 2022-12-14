const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
require('dotenv').config();

const { checkUser, requireAuth } = require("./middleware/auth");

const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
const commentRoutes = require('./routes/comment.route');

mongoose.connect(process.env.SECRET_KEY,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(() => console.log('Connexion à MongoDB échouée'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).json(res.locals.user);
});
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;