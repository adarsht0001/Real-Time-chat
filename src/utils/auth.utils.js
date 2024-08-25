import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const createAccessToken = (userId, email) => {
  const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });
  return token;
};
