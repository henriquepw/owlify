import { Request, Response } from 'express';
import User from '../models/User';

interface BodyStore {
  name: string;
  email: string;
  password: string;
}

class UserController {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body as BodyStore;

    /**
     * Check if use already exists
     */
    const isExists = await User.findOne({ where: { email } });

    if (isExists) {
      return res.status(400).json({ error: 'Duplicated email' });
    }

    try {
      const user = await User.create({
        name,
        email,
        password,
      });

      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: err.stack });
    }
  }
}

export default new UserController();
