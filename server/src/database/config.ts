import { FieldType } from 'influx/lib/src/grammar/ds';
import { ISingleHostConfig } from 'influx';

export default {
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
        snr: FieldType.FLOAT,
        id: FieldType.INTEGER,
        rssi: FieldType.INTEGER,
        success: FieldType.BOOLEAN,
      },
      tags: ['host'],
    },
  ],
} as ISingleHostConfig;
