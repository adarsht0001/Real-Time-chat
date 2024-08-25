import services from '../services/index.js';
import response from '../utils/response.js';
import statusCode from '../utils/statuscode.js';

const authController = {
  async createUser(req, res, next) {
    try {
      const data = await services.auth.createUser(req, res);
      return response.sendSuccessResponse(req, res, data, statusCode.CREATED);
    } catch (error) {
      next(error);
    }
  },

  async loginUser(req, res, next) {
    try {
      const data = await services.auth.loginUser(req, res);
      return response.sendSuccessResponse(req, res, data, statusCode.OK);
    } catch (error) {
      next(error);
    }
  },

};

export default authController;
