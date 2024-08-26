import jwt from 'jsonwebtoken';
import { hash, verify } from 'argon2';

export const hashPassword = async (password) => {
  const hashedPassword = await hash(password);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const verified = await verify(hashedPassword, password);
  return verified;
};

export const createAccessToken = (userId, email) => {
  const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });
  return token;
};
