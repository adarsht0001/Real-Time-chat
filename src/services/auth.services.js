import models from '../models/index.js';
import {
  createAccessToken,
  comparePassword,
  hashPassword,
} from '../utils/auth.utils.js';
import AppError from '../utils/error.js';
import statusCode from '../utils/statuscode.js';

const authServices = {
  async createUser(req, res) {
    const { email, name, password } = req.body;
    const existingUser = await models.user.findOne({ email }).lean();
    if (existingUser) {
      throw new AppError('user email already exists', statusCode.UNAUTHORIZED);
    }
    const hashedPassword = hashPassword(password);
    const user = new models.user({ email, name, password: hashedPassword });
    user.save();
    return user;
  },

  async loginUser(req, res) {
    const { email, password } = req.body;

    const user = await models.user.findOne({ email });
    if (!user) {
      throw new AppError(
        `The email address ${email} is not associated with any account. please check and try again!`,
        statusCode.UNAUTHORIZED
      );
    }

    const isValidPassword = comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new AppError('Wrong Password!', statusCode.UNAUTHORIZED);
    }

    const token = createAccessToken(user._id, email);

    return {
      name: user.name,
      email: user.email,
      token,
    };
  },
};

export default authServices;
