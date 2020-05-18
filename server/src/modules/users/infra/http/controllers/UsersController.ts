import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';

class UsersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showUserProfile = container.resolve(ShowUserProfileService);

    const profile = await showUserProfile.execute(req.user.id);

    return res.json(profile);
  }

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
    const { name, email, oldPassword, password } = req.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = updateUser.execute({
      userId: req.user.id,
      name,
      email,
      oldPassword,
      password,
    });

    return res.json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(req.user.id);

    return res.status(204).send();
  }
}

export default new UsersController();
