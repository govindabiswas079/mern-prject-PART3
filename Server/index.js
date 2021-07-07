import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import mongoose from './db.js';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

var app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors({ origin: 'http://localhost:3000' }));
//app.use(cors());

app.listen(5000, () => console.log('Server started at port : 5000'));


app.use('/posts', postRoutes);
app.use("/user", userRouter);