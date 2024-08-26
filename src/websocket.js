import logger from './utils/logger.js';
import { addUser, getUser, removeUser } from './utils/socker.utils.js';

const socketServer = (io) => {
  io.on('connection', (socket) => {
    logger.info('new client connected');

    socket.on('join', ({ userId, room }) => {
      addUser(userId, socket.id, room);
      if (room) {
        socket.brodcast.to(room).emit('user-connected', userId);
      }
    });

    //group message

    socket.on('group-message', ({ senderId, message }) => {
      const sender = getUser(senderId);
      if (sender.room) {
        socket.brodcast
          .to(sender.room)
          .emit('recieve-group-message', { senderId, message });
      }
    });

    //used only for direct message
    socket.on('direct-message', ({ senderId, recieverId, text }) => {
      const receiver = getUser(recieverId);
      if (receiver) {
        io.to(receiver.socketId).emit('recieve-message', { senderId, text });
      }
    });

    socket.on('disconnect', () => {
      logger.warn('user disconnected');
      removeUser(socket.id);
    });
  });
};

export default socketServer;
