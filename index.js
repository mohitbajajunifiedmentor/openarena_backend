import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB  from './src/config/db.js';
import apiRoutes from './src/routes/index.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`OpenArena API running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
