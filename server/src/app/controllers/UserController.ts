import { Request, Response } from 'express';
import User from '../models/User';

interface UpdateBody extends User {
  oldPassword?: string;
}

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

  async update(req: Request, res: Response) {
    const { email, oldPassword } = req.body as UpdateBody;

    const user = (await User.findByPk(req.userId)) as User;

    if (email && email !== user.email) {
      const isExists = await User.findOne({ where: { email } });

      if (isExists) {
        return res.status(400).json({ error: 'Duplicated email' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not math' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req: Request, res: Response) {
    const id = req.userId;

    const userDeleted = await User.destroy({
      where: { id },
    });

    return res.json({ deleted: userDeleted });
  }
}

export default new UserController();
