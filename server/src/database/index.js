import { InfluxDB } from 'influx';
import influxConfig from '../config/database';

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.influx = new InfluxDB(influxConfig);

    const names = await this.influx.getDatabaseNames();

    if (!names.includes(process.env.DB_NAME)) {
      await this.influx.createDatabase(process.env.DB_NAME);
    }
  }
}

export default new Database().influx;