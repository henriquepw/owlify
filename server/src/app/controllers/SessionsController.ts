import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';

import User from '../models/User';

class SessionsController {
  public async store(req: Request, res: Response): Promise<Response> {
    const usersRepository = getRepository(User);

    const { email, password } = req.body as User;

    /**
     * Check if user exists
     */
    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // if (!(await user.checkPassword(password))) {
    //   return res.status(401).json({ error: 'Password does not match' });
    // }

    const { id, name } = user;

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return res.json({
      token,
      user: {
        id,
        name,
        email,
      },
    });
  }
}

export default new SessionsController();
