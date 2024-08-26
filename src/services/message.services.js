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

  async messageHistory(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.pageSize) || 10;
    const groupId = req.query.groupId;
    const skip = (page - 1) * limit;

    const { userId } = req.query;
    const withUserId = req.query.withUserId;

    if (!userId) {
      throw new AppError('userId is required', statusCode.BAD_REQUEST);
    }

    const query = { senderId: userId };
    if (groupId) {
      query.groupId = groupId;
    }
    if (withUserId) {
      query.$or = [
        { senderId: userId, receiverId: withUserId },
        { senderId: withUserId, receiverId: userId },
      ];
    }
    const totalMatchedMessage = await models.message.countDocuments(query);
    const totalPages = Math.ceil(totalMatchedMessage / limit);

    const messages = await models.message.find(query).skip(skip).limit(limit);
    return {
      messages,
      totalPages,
      currenntPage: page,
      totalMessages:totalMatchedMessage,
      limit,
      hasNext: page < totalPages,
    };
  },
};

export default messageServices;
