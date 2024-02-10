const express = require('express');
const {connectDB} = require('./config/db');
const {userRouter} = require('./routes/userRoutes');
const {postRouter} = require('./routes/postRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));