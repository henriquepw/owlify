import { Model, DataTypes, Sequelize } from 'sequelize';

import { IModels } from './Associate';

class Gateway extends Model {
  public id!: string;

  public user_id!: string;

  public locate!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static start(sequelize: Sequelize): typeof Gateway {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        locate: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    this.associate(sequelize.models);

    return this;
  }

  public static associate(models: IModels): void {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Gateway;
