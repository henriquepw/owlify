import { Request, Response } from 'express';
import User from '../models/User';

interface BodyStore {
  name: string;
  email: string;
  password: string;
}

class UserController {
  async store(req: Request, res: Response) {
    const { name, email, password: password_hash } = req.body as BodyStore;

    const user = await User.create({
      name,
      email,
      password_hash,
    });

    return res.json(user);
  }
}

export default new UserController();
