import { Model, ModelCtor } from 'sequelize';

export interface Models {
  [key: string]: ModelCtor<Model>;
}
