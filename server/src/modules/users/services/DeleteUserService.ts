import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (user) {
      await this.usersRepository.remove(user);
    }
  }
}

export default DeleteUserService;
