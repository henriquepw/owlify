import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

const usersRepository = getRepository(User);

class SessionsController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as User;

    /**
     * Check if user exists
     */
    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      token: user.generateToken(),
      user: {
        id,
        name,
        email,
      },
    });
  }
}

export default new SessionsController();
