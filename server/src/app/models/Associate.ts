import { Model, ModelCtor } from 'sequelize';

export interface IModels {
  [key: string]: ModelCtor<Model>;
}
