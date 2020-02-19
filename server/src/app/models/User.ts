import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  public id!: number;

  public name!: string;

  public password_hash!: string;

  public readonly password!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static start(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async (user: User) => {
      if (user.password) {
        // eslint-disable-next-line no-param-reassign
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

export default User;
