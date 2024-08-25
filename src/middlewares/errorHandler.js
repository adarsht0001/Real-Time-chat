import logger from '../utils/logger.js';
import response from '../utils/response.js';

const errorHandlingMiddleware = (err, req, res, next) => {
  logger.error(err);
  const status = err.statusCode || 400;

  if (typeof err === typeof '') {
    response.sendFailResponse(req, res, status, err, {});
  } else if (err.Error) {
    response.sendFailResponse(req, res, status, err.message, {});
  } else if (err.message) {
    response.sendFailResponse(req, res, status, err.message, {});
  } else res.status(status).send({ status: status, message: err.message });
};

export default errorHandlingMiddleware;
