export default {
  secret: process.env.JWT_SECRET ?? ' ',
  expiresIn: process.env.JWT_EXPIRESIN ?? '7d',
};
