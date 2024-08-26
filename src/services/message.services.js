import { Types } from 'mongoose';
import AppError from '../utils/error.js';
import statusCode from '../utils/statuscode.js';
import models from '../models/index.js';

const messageServices = {
  async createMessage(req, res) {
    const { senderId, receiverId, groupId, content } = req.body;
    if (!senderId) {
      throw new AppError('sender Id is required', statusCode.BAD_REQUEST);
    }
    if (!Types.ObjectId.isValid(senderId)) {
      throw new AppError('sender Id is not valid', statusCode.BAD_REQUEST);
    }

    if (receiverId && !Types.ObjectId.isValid(receiverId)) {
      throw new AppError('receiver Id is not valid', statusCode.BAD_REQUEST);
    }

    if (groupId && !Types.ObjectId.isValid(groupId)) {
      throw new AppError('group Id is not valid', statusCode.BAD_REQUEST);
    }

    if (!content) {
      throw new AppError('content is required', statusCode.BAD_REQUEST);
    }

    const message = new models.message({
      senderId,
      receiverId,
      groupId,
      content,
    });
    message.save();
    return message;
  },
};

export default messageServices;
