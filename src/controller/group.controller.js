import services from '../services/index.js';
import response from '../utils/response.js';
import statusCode from '../utils/statuscode.js';

const groupController = {
  async createGroup(req, res, next) {
    try {
      const data = await services.group.createGroup(req, res);
      return response.sendSuccessResponse(req, res, data, statusCode.CREATED);
    } catch (error) {
      next(error);
    }
  },
};

export default groupController;
