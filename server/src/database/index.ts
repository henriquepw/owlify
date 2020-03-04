import { Sequelize, Options } from 'sequelize';
import dbConfig from '../config/postgres';

import User from '../app/models/User';
import Gateway from '../app/models/Gateway';
// import Endnode from '../app/models/Endnode';

const MODELS = [User, Gateway /* , Endnode */];

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  public init() {
    this.connection = new Sequelize(dbConfig as Options);

    MODELS.map(model => model.start(this.connection));
  }
}

export default new Database();
