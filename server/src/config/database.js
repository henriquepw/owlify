require('dotenv/config');

const Influx = require('influx');

module.exports = {
  host: 'localhost',
  database: 'mydb',
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
