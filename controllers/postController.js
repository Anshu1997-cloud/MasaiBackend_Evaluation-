const {PostModel} = require('../models/post');


const getPosts = async (req, res) => {
    try {
      const posts = await PostModel.find({ user: req.user.id });
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const addPost = async (req, res) => {
    try {
      const { title, body, device } = req.body;
      const newPost = new Post({
        title,
        body,
        device,
        user: req.user.id
      });
      await newPost.save();
      res.status(201).json({ message: 'Post added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, body, device } = req.body;
      let post = await PostModel.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      post = await PostModel.findByIdAndUpdate(id, { title, body, device }, { new: true });
      res.json({ message: 'Post updated successfully', post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      let post = await PostModel.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      await PostModel.findByIdAndDelete(id);
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  module.exports = {
      getPosts, addPost, updatePost, deletePost
  }