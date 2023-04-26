const Post = require('../models/post');
const Comment = require('../models/comment');
const express = require('express');
const authenticateToken = require('../middleware/auth');

const postRouter = express.Router();

// Create a new post
postRouter.post('/api/posts', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;

    const post = new Post({
      title,
      description,
      author: req.user.id,
    });

    await post.save();

    res.json({
      id: post._id,
      title: post.title,
      description: post.description,
      createdAt: post.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete a post by ID
postRouter.delete('/api/delete/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.user.id,
    });

    if (!post) {
      return res.status(404).send('Post not found');
    }

    await Post.findByIdAndDelete(post._id || post.author);

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Like a post by ID
postRouter.post('/api/like/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    if (post.likes.includes(req.user.id)) {
      return res.status(400).send('Post already liked');
    }

    post.likes.push(req.user.id);

    await post.save();

    res.json({ message: 'Post liked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Unlike a post by ID
postRouter.post('/api/unlike/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    if (!post.likes.includes(req.user.id)) {
      return res.status(400).send('Post not yet liked');
    }

    post.likes = post.likes.filter((like) => like.toString() !== req.user.id);

    await post.save();

    res.json({ message: 'Post unliked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// comment on the post

postRouter.post('/api/comment/:id', authenticateToken, async (req, res) => {
  try {
    const { comment } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    const newComment = new Comment({
      comment,
      user: req.user.id,
    });

    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();

    res.json({
      comment: newComment._id,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

postRouter.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('likes')
      .populate('comments')
      .exec();

    if (!post) {
      return res.status(404).send('Post not found');
    }

    // Get number of likes for the post
    const likesCount = post.likes.length;

    res.json({
      id: post._id,
      title: post.title,
      desc: post.description,
      created_at: post.created_at,
      comments: post.comments,
      likes: likesCount,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// grting all my post

postRouter.get('/api/all_posts', authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id })
      .sort({ created_at: -1 })
      .populate('likes')
      .populate('comments')
      .exec();

    res.json(
      posts.map((post) => ({
        id: post._id,
        title: post.title,
        desc: post.description,
        created_at: post.created_at,
        comments: post.comments,
        likes: post.likes.length,
      }))
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = postRouter;
