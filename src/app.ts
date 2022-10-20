import express from 'express';
import cors from 'cors';
import { libRouter } from './routes/lib.routes';

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/lib', libRouter);

