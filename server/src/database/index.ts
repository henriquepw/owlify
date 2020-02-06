import { InfluxDB } from 'influx';
import influxConfig from './config';

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

    if (!databases.includes(process.env.DB_NAME)) {
      await this.influx.createDatabase(process.env.DB_NAME);
    }
  }

  public async dropDB() {
    await this.influx.dropDatabase(process.env.DB_NAME);
  }
}

const { influx, createDB, dropDB } = new Database();

export default influx;

export {
  createDB,
  dropDB,
};
