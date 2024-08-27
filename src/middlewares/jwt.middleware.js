import models from '../models/index.js';
import { verifyToken } from '../utils/auth.utils.js';
import AppError from '../utils/error.js';
import statusCode from '../utils/statuscode.js';

const jwtVerify = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer')
    ) {
      throw new AppError('Token not found', statusCode.UNAUTHORIZED);
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new AppError('Token not found', statusCode.UNAUTHORIZED);
    }

    const user = verifyToken(token);
    const userExist = await models.user.findById(user.id).lean();
    if (!userExist) {
      throw new AppError('Invalid User Token', statusCode.UNAUTHORIZED);
    }


    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
export default jwtVerify;
