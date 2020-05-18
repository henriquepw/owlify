import { Request, Response } from 'express';

import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

class UsersController {
  public async store(req: Request, res: Response): Promise<Response> {
    const usersRepository = new UsersRepository();

    const { name, email, password } = req.body;

    /**
     * Check if use already exists
     */
    const isExists = await usersRepository.findByEmail(email);

    if (isExists) {
      return res.status(400).json({ error: 'Duplicated email' });
    }

    try {
      const user = await usersRepository.create({
        name,
        email,
        password,
      });

      return res.json({
        id: user.id,
        name,
        email,
      });
    } catch (err) {
      return res.status(500).json({ error: err.stack });
    }
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
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(req.user.id);

    if (user) {
      await usersRepository.remove(user);
    }

    return res.status(204).send();
  }
}

export default new UsersController();
