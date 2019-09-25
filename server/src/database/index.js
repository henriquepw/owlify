import { InfluxDB } from 'influx';
import influxConfig from '../config/database';

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.influx = new InfluxDB(influxConfig);

    const names = await this.influx.getDatabaseNames();

    if (!names.includes('mydb')) {
      await this.influx.createDatabase('mydb');
    }
  }
}

export default new Database().influx;
