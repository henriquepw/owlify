import { Sequelize } from 'sequelize';
import dbConfig from '../config/postgres';

export default new Sequelize(dbConfig);
