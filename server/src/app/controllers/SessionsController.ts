import { Request, Response } from 'express';

import User from '../models/User';

class SessionsController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body as User;

    /**
     * Check if user exists
     */
    const user = await User.findOne({ where: { email } });

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
