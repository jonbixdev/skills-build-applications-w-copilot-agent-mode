import cors from 'cors';
import express from 'express';
import database from './config/database.js';
import apiRouter from './routes/api.js';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/config/', (_request, response) => {
  response.json({ apiBaseUrl: baseUrl });
});

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: database.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening at ${baseUrl}`);
});