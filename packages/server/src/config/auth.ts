export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'this is no secret',
    expiresIn: process.env.JWT_EXPIRESIN || '7d',
  },
};
