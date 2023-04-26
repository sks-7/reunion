const express = require('express');
require('dotenv').config();
const userRouter = express.Router();
const User = require('../models/user');
const authenticateToken = require('../middleware/auth');
const jwt = require('jsonwebtoken');

userRouter.post('/api/authenticate', async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

  res.send(token);

  // ------------ creteing user-----------

  // const { email, password } = req.body;

  // try {
  //   const userdata = await User.create({ email, password });
  //   res.send({ status: true, message: 'User created succefully', userdata });
  // } catch (e) {
  //   console.log(e.message);
  // }
});

// Follow user
userRouter.post('/api/follow/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  console.log(id);

  const user = await User.findById(req.user.id);
  // console.log(user)

  if (user.followings.includes(id)) {
    return res.status(400).send('You are already following this user');
  }

  user.followings.push(id);
  await user.save();

  await User.findByIdAndUpdate(id, { $push: { followers: user._id } });

  res.send('You are now following this user');
});

// Unfollow user
userRouter.post('/api/unfollow/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);

    if (!user.followings.includes(id)) {
      return res.status(400).send('You are not following this user');
    }

    // Remove the user from the "followings" array of the current user
    user.followings = user.followings.filter(
      (followingId) => followingId !== id
    );
    await user.save();

    // Remove the current user from the "followers" array of the user being unfollowed
    await User.findByIdAndUpdate(
      id,
      { $pull: { followers: user._id } },
      { new: true }
    );

    // Remove the user being unfollowed from the "followings" array of the current user
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { followings: id } },
      { new: true }
    );

    res.json({ message: 'You have unfollowed this user' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get user profile
userRouter.get('/api/user', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id);

  const numFollowers = user.followers.length;
  const numFollowings = user.followings.length;

  res.send({ numFollowers, numFollowings });
});

module.exports = userRouter;
