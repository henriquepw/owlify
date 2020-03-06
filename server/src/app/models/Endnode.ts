import { Model, DataTypes, Sequelize } from 'sequelize';

import { Models } from './Associate';

class Endnode extends Model {
  public id!: string;

  public gateway_id!: string;

  public name!: string;

  public room!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static start(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        room: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    this.associate(sequelize.models);

    return this;
  }

  public static associate(models: Models) {
    this.belongsTo(models.Gateway, { foreignKey: 'gateway_id', as: 'gateway' });
  }
}

export default Endnode;
