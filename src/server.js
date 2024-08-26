import 'dotenv/config.js';
import express from 'express';
import http from 'http';
import errorHandlingMiddleware from './middlewares/errorHandler.js';
import AppError from './utils/error.js';
import statusCode from './utils/statuscode.js';
import logger from './utils/logger.js';
import dbConnect from './config/db.config.js';
import routes from './routes/index.js';
import { Server } from 'socket.io';
import socketConfig from './config/socket.config.js';
import socketServer from './websocket.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: "json" };;

dbConnect();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, socketConfig);
socketServer(io);

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.all('*', (_req, _res, next) => {
  next(new AppError('not found', statusCode.NOT_FOUND));
});

//error handling middleware
app.use(errorHandlingMiddleware);

server.listen(port, () => {
  logger.info(`server running on ${port}`);
});
