import cors from 'cors';
import express from 'express';
import { apiBaseUrl } from './config/api.js';
import database from './config/database.js';
import apiRouter from './routes/api.js';

const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/config/', (_request, response) => {
  response.json({ apiBaseUrl });
});

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: database.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});