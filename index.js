const express = require('express');
const connect = require('./config/conect');
require('dotenv').config();
const userRouter = require('./controllers/userController');
const postRouter = require('./controllers/postController');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('welcome to my website');
});

// geting user;
app.use('/', userRouter);

//geting post

app.use('/', postRouter);

// Start server
app.listen(PORT, async () => {
  try {
    await connect;
    console.log('Connected to Database');
  } catch (error) {
    console.log(error);
    console.log('Not connected');
  }
  console.log(`Listning at PORT ${PORT}`);
});
