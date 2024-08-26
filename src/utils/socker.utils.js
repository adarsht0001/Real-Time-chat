let users = [];

export const addUser = (userId, socketId, room) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId, room });
  }
};

export const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

export const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
