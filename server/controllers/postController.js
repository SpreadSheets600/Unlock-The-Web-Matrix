const Post = require("../model/Post");

exports.getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

exports.createPost = async (req, res) => {
  const post = new Post({
    ...req.body,
    author: req.user.id,
  });
  await post.save();
  res.status(201).json(post);
};
