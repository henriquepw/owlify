import { Request, Response } from 'express';
import { container } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

class UsersController {
  public async store(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService);

    const { name, email, password } = req.body;

    const user = await createUser.execute({
      password,
      email,
      name,
    });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const usersRepository = new UsersRepository();

    const { email, oldPassword } = req.body;
    const { id } = req.user;

    const user = (await usersRepository.findById(id)) as User;

    if (email && email !== user.email) {
      const isExists = await usersRepository.findByEmail(email);

      if (isExists) {
        return res.status(400).json({ error: 'Duplicated email' });
      }
    }

    // if (oldPassword && !(await user.checkPassword(oldPassword))) {
    //   return res.status(401).json({ error: 'Password does not math' });
    // }

    // await usersRepository.update(id, user);

    return res.json({
      id,
      name: user.name,
      email,
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(req.user.id);

    return res.status(204).send();
  }
}

export default new UsersController();
