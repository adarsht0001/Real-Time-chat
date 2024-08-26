import services from '../services/index.js';
import response from '../utils/response.js';
import statusCode from '../utils/statuscode.js';

const messageController = {
  async createMessage(req, res, next) {
    try {
      const data = await services.message.createMessage(req, res);
      return response.sendSuccessResponse(req, res, data, statusCode.CREATED);
    } catch (error) {
      next(error);
    }
  },
};

export default messageController;
