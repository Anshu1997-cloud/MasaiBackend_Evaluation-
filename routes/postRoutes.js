const express = require('express');
const postRouter = express.Router();
const {authMiddleware}= require('../middleware/authMiddleware');
const { getPosts, addPost, updatePost, deletePost} = require('../controllers/postController');

postRouter.use(authMiddleware);

postRouter.get('/', getPosts);

postRouter.post('/add', addPost);

postRouter.put('/:id', updatePost);

postRouter.delete('/:id', deletePost);

module.exports = {
    postRouter
}
