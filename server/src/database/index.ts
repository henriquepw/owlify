import { Sequelize } from 'sequelize';
import dbConfig from '../config/postgres';

import User from '../app/models/User';

const MODELS = [User];

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  public init() {
    this.connection = new Sequelize(dbConfig);

    MODELS.map(model => model.start(this.connection));
  }
}

export default new Database();
