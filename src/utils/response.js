import statusCode from './statuscode.js';

function sendSuccessResponse(
  req,
  res,
  data,
  httpCode = statusCode.OK,
  message
) {
  if (!data && message) {
    data = {
      message: message,
    };
  } else if (data && message) {
    data.message = message;
  }
  const responseData = {};
  const headers = {};
  data = data || {};
  responseData.data = data;
  responseData.statusCode = httpCode || 200;
  responseData.message = 'Success';
  res.status(httpCode).set(headers).send(responseData);
}

function sendFailResponse(
  req,
  res,
  httpCode = statusCode.BAD_REQUEST,
  message,
  data
) {
  data = {
    statusCode: httpCode,
    message: message,
  };
  if (data) {
    data.data = {};
  }
  res.status(httpCode).send(data);
}

export default {
  sendSuccessResponse,
  sendFailResponse,
};
