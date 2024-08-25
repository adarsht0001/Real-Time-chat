import mongoose from 'mongoose';
import logger from '../utils/logger.js';

function dbConnect() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      logger.info('successfully connected to database');
    })
    .catch((err) => {
      logger.error(`DataBase Error, ${err.message}`);
    });
}

export default dbConnect;
