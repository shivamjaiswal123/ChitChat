import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import messageRouter from './routes/message.routes';

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ALLOW_ORIGIN,
    credentials: true, // Allow cookies to be sent
  })
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/message', messageRouter);
