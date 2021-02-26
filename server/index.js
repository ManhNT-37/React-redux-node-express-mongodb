import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRouter from './routes/posts.js';
import userRouter from './routes/auth.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/posts', postRouter);
app.use('/user', userRouter);

const CONNECTION_URL = 'mongodb+srv://manhnt-37:Aa1234567890@cluster0.qdmca.mongodb.net/<dbname>?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Máy chủ đang chạy trên cổng: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} kết nối thất bại`));

mongoose.set('useFindAndModify', false);