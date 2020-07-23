import { ISingleHostConfig } from 'influx';
import { FieldType } from 'influx/lib/src/grammar/ds';

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
      tags: ['endnodeId'],
    },
    {
      measurement: 'packet',
      fields: {
        snr: FieldType.FLOAT,
        rssi: FieldType.INTEGER,
        count: FieldType.INTEGER,
        success: FieldType.BOOLEAN,
      },
      tags: ['endnodeId'],
    },
  ],
} as ISingleHostConfig;
