import 'dotenv/config.js';
import express from 'express';
import http from 'http';
import errorHandlingMiddleware from './middlewares/errorHandler.js';
import AppError from './utils/error.js';
import statusCode from './utils/statuscode.js';
import logger from './utils/logger.js';
import dbConnect from './config/db.config.js';
import routes from './routes/index.js';

dbConnect();
const app = express();
const port = process.env.PORT;

const server = http.createServer(app);

app.use(express.json());

app.use('/api/v1', routes);

app.all('*', (_req, _res, next) => {
  next(new AppError('not found', statusCode.NOT_FOUND));
});

//error handling middleware
app.use(errorHandlingMiddleware);

server.listen(port, () => {
  logger.info(`server running on ${port}`);
});
