require('dotenv/config');

const { FieldType } = require('influx/lib/src/grammar/ds');

module.exports = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  schema: [
    {
      measurement: 'sensor',
      fields: {
        humidity: FieldType.FLOAT,
        temperature: FieldType.FLOAT,
      },
      tags: ['host'],
    },
    {
      measurement: 'package',
      fields: {
        id: FieldType.INTEGER,
        rssi: FieldType.INTEGER,
        success: FieldType.BOOLEAN,
      },
      tags: ['host'],
    },
  ],
};
