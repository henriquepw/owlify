require('dotenv/config');

const { FieldType } = require('influx/lib/src/grammar/ds');

module.exports = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  schema: [
    {
      measurement: 'sensor',
      fields: {
        temperature: FieldType.INTEGER,
        humidity: FieldType.INTEGER,
      },
      tags: ['host'],
    },
    {
      measurement: 'package',
      fields: {
        success: FieldType.BOOLEAN,
      },
      tags: ['host'],
    },
  ],
};
