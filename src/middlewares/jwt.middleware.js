import AppError from '../utils/error.js';
import statusCode from '../utils/statuscode.js';
import jwt from 'jsonwebtoken';

const jwtVerify = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    throw new AppError('Token not found', statusCode.UNAUTHORIZED);
  }

  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(401).json({ msg: 'Invalid Token' });
    next();
  });
};
export default jwtVerify;
