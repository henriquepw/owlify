import { InfluxDB } from 'influx';

import influxConfig from '@config/influx';

class Database {
  public influx: InfluxDB;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    this.influx = new InfluxDB(influxConfig);

    await this.createDB();
  }

  private async createDB(): Promise<void> {
    const { DB_NAME } = process.env;

    const databases = await this.influx.getDatabaseNames();

    if (!DB_NAME) {
      throw new Error('DB_NAME variable is not defined on .env file');
    }

    if (!databases.includes(DB_NAME)) {
      await this.influx.createDatabase(DB_NAME);
    }
  }
}

export default new Database().influx;
