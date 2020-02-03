import { InfluxDB } from 'influx';
import influxConfig from './config';

class Database {
  public influx: InfluxDB;

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
