import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, userData, { id: uuid() });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(current => current.id === user.id);

    if (findIndex) {
      this.users[findIndex] = user;
    } else {
      this.users.push(user);
    }

    return user;
  }

  public async remove({ id }: User): Promise<void> {
    this.users = this.users.filter(current => current.id !== id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(current => current.email === email);

    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(current => current.id === id);

    return findUser;
  }
}

export default FakeUsersRepository;
