import { Model, DataTypes, Sequelize } from 'sequelize';

class User extends Model {
  public id!: number;

  public name!: string;

  public password_hash!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static start(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default User;
