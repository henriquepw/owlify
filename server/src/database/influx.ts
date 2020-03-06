import { InfluxDB } from 'influx';
import influxConfig from '../config/influx';

class Database {
  public influx: InfluxDB;

  constructor() {
    this.init();
  }

  private async init() {
    this.influx = new InfluxDB(influxConfig);

    await this.createDB();
  }

  public async createDB() {
    const databases = await this.influx.getDatabaseNames();

    if (!databases.includes(process.env.DB_NAME as string)) {
      await this.influx.createDatabase(process.env.DB_NAME as string);
    }
  }
}

export default new Database().influx;
