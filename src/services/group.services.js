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
          statusCode.BAD_REQUEST
        );
      }
    }

    const newGroup = new models.group({
      name,
      members:[...members, req.user.id],
      admin: req.user.id,
    });

    return newGroup;
  },
};

export default groupServices;
