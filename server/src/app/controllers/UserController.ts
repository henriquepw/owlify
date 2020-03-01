import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body as User;

    /**
     * Check if use already exists
     */
    const isExists = await User.findOne({ where: { email } });

    if (isExists) {
      return res.status(400).json({ error: 'Duplicated email' });
    }

    try {
      const { id } = await User.create({
        name,
        email,
        password,
      });

      return res.json({
        id,
        name,
        email,
      });
    } catch (err) {
      return res.status(500).json({ error: err.stack });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body as User;

    if (!id) {
      return res.status(400).send({ error: 'Need an user id' });
    }

    /**
     * Check if use already exists
     */
    const isExists = await User.findOne({ where: { id } });

    if (!isExists) {
      return res.status(400).send({ error: 'User not exist' });
    }

    const userDeleted = await User.destroy({
      where: { id },
    });

    return res.json({ deleted: userDeleted });
  }
}

export default new UserController();
