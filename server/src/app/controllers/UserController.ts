import { getRepository } from 'typeorm';

import { Request, Response } from 'express';
import User from '../models/User';

const usersRepository = getRepository(User);

class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    /**
     * Check if use already exists
     */
    const isExists = await usersRepository.findOne({ where: { email } });

    if (isExists) {
      return res.status(400).json({ error: 'Duplicated email' });
    }

    try {
      const user = usersRepository.create({
        name,
        email,
        password,
      });

      await usersRepository.save(user);

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
    const { email, oldPassword } = req.body;
    const { id } = req.user;

    const user = (await usersRepository.findOne(id)) as User;

    if (email && email !== user.email) {
      const isExists = await usersRepository.findOne({ where: { email } });

      if (isExists) {
        return res.status(400).json({ error: 'Duplicated email' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not math' });
    }

    await usersRepository.update(id, user);

    return res.json({
      id,
      name: user.name,
      email,
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const user = (await usersRepository.findOne(req.user.id)) as User;

    await usersRepository.remove(user);

    return res.status(204).send();
  }
}

export default new UserController();
