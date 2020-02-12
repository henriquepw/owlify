require('../bootstrap');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
