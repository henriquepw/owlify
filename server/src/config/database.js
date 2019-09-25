require('dotenv/config');

const Influx = require('influx');

module.exports = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  schema: [
    {
      measurement: 'sensor',
      fields: {
        temperature: Influx.FieldType.STRING,
        humidity: Influx.FieldType.INTEGER,
      },
      tags: ['host'],
    },
  ],
};
