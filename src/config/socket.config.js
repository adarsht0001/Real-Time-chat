const socketConfig = {
  path: '/api/socket.io',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
};

export default socketConfig;
