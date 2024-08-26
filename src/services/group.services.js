import AppError from '../utils/error.js';
import statusCode from '../utils/statuscode.js';
import models from '../models/index.js';

const groupServices = {
  async createGroup(req, res) {
    const { name, members } = req.body;
    if (!name && typeof name !== 'string') {
      throw new AppError('Name is required', statusCode.BAD_REQUEST);
    }

    if (!Array.isArray(members) || members.length === 0) {
      throw new AppError(
        'Members field must be an array of array of the group memebers',
        statusCode.BAD_REQUEST
      );
    }

    for (let i = 0; i < members.length; i++) {
      if (!members[i].length) {
        throw new AppError(
          `Got an invalid member ${members[i]}`,
          statusCode.BAD_REQUEST
        );
      }
      const member = await models.user.findById(members[i]);
      if (!member) {
        throw new AppError(
          `Got an invalid member ${members[i]}`,
          statusCode.NOT_FOUND
        );
      }
    }

    const newGroup = new models.group({
      name,
      members: [...members, req.user.id],
      admin: req.user.id,
    });

    await newGroup.save();

    return newGroup;
  },

  async sendGroupMessage(req, res) {
    const groupId = req.params.id;
    const { senderId, content } = req.body;

    if (!senderId) {
      throw new AppError('sender Id is required', statusCode.BAD_REQUEST);
    }

    if (senderId !== req.user.id) {
      throw new AppError('sender Id is not valid', statusCode.BAD_REQUEST);
    }

    if (!content) {
      throw new AppError('content is required', statusCode.BAD_REQUEST);
    }

    const group = await models.group.findById(groupId);
    if (!group) {
      throw new AppError('Invalid group Id', statusCode.NOT_FOUND);
    }

    const message = new models.message({
      senderId,
      groupId,
      content,
    });
    message.save();
    return message;
  },
};

export default groupServices;
