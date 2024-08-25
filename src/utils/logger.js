import pino from 'pino';

const logger = pino({
  depthLimit: 10,
  edgeLimit: 200,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export default logger;
