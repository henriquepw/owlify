import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  generateToken(): string {
    const { secret, expiresIn } = authConfig;

    return jwt.sign({ id: this.id }, secret, {
      expiresIn,
    });
  }
}

export default User;
