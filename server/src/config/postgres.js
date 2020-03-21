// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
  dialect: process.env.PG_DIALECT || 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_NAME,
  storage: './__tests__/database.sqlite',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
};
